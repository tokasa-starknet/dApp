use core::traits::Into;
use core::serde::Serde;
use starknet::ContractAddress;

use core::integer::u256;
use openzeppelin_access::accesscontrol::AccessControlComponent;
use openzeppelin_token::erc20::ERC20Component;
use openzeppelin_token::erc20::interface::IERC20;
use openzeppelin_security::pausable::PausableComponent;
use openzeppelin_introspection::src5::SRC5Component;
use starknet::storage::StoragePointerWriteAccess;
use starknet::storage::StoragePointerReadAccess;


// Custom Interface Definitions
#[starknet::interface]
trait IToKaMinting<TContractState> {
    fn mint(ref self: TContractState, to: ContractAddress, amount: u256);
    fn get_cap(self: @TContractState) -> u256;
}

#[starknet::interface]
trait IToKaBurning<TContractState> {
    fn burn(ref self: TContractState, amount: u256);
    fn burn_from(ref self: TContractState, account: ContractAddress, amount: u256);
}

#[starknet::interface]
trait IToKaPausable<TContractState> {
    fn pause(ref self: TContractState);
    fn unpause(ref self: TContractState);
}

#[starknet::contract]
mod TokaToken {
   
use super::*;
    use starknet::{get_caller_address, get_block_timestamp};
    use core::num::traits::Pow;
    
    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: PausableComponent, storage: pausable, event: PausableEvent);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    
    #[abi(embed_v0)]
    impl ERC20MetadataImpl = ERC20Component::ERC20MetadataImpl<ContractState>;
    
    #[abi(embed_v0)]
    impl AccessControlImpl = AccessControlComponent::AccessControlImpl<ContractState>;
    
    #[abi(embed_v0)]
    impl PausableImpl = PausableComponent::PausableImpl<ContractState>;
    
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;
    
    // Internal implementations
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;
    impl AccessControlInternalImpl = AccessControlComponent::InternalImpl<ContractState>;
    impl PausableInternalImpl = PausableComponent::InternalImpl<ContractState>;
    impl SRC5InternalImpl = SRC5Component::InternalImpl<ContractState>;
    
    impl ERC20HooksImpl of ERC20Component::ERC20HooksTrait<ContractState> {
        fn before_update(
            ref self: ERC20Component::ComponentState<ContractState>,
            from: ContractAddress,
            recipient: ContractAddress,
            amount: u256
        ) {
           //Logic Here
        }

        fn after_update(
            ref self: ERC20Component::ComponentState<ContractState>,
            from: ContractAddress,
            recipient: ContractAddress,
            amount: u256
        ) {
               //Logic Here
        }
    }
    
    // Role constants
    pub const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");
    pub const DEFAULT_ADMIN_ROLE: felt252 = 0;
    pub const PAUSER_ROLE: felt252 = selector!("PAUSER_ROLE");
    
    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        cap: u256,
    }
    
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event,
        #[flat]
        AccessControlEvent: AccessControlComponent::Event,
        #[flat]
        PausableEvent: PausableComponent::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
    }

    #[constructor]
    fn constructor(ref self: ContractState, admin: ContractAddress) {
        // Initialize variables
        let name = "ToKa";
        let symbol = "TKA";
        let decimals: u8 = 18;
        let cap = u256 { low: 100_000_000_u128 * Pow::pow(10_u128, decimals.into()), high: 0 };

        // Initialize components
        self.erc20.initializer(name, symbol);
        self.accesscontrol.initializer();
        self.cap.write(cap);

        // Grant additional roles to the admin
        self.accesscontrol.grant_role(MINTER_ROLE, admin);
        self.accesscontrol.grant_role(PAUSER_ROLE, admin);
    }
    
    #[abi(embed_v0)]
    impl ERC20SafeImpl of IERC20<ContractState> {
        fn transfer(ref self: ContractState, recipient: ContractAddress, amount: u256) -> bool {
            self.pausable.assert_not_paused();
            self.erc20.transfer(recipient, amount)
        }
        
        fn transfer_from(
            ref self: ContractState, 
            sender: ContractAddress, 
            recipient: ContractAddress, 
            amount: u256
        ) -> bool {
            self.pausable.assert_not_paused();
            self.erc20.transfer_from(sender, recipient, amount)
        }
        
        fn approve(ref self: ContractState, spender: ContractAddress, amount: u256) -> bool {
            self.erc20.approve(spender, amount)
        }
        
        fn total_supply(self: @ContractState) -> u256 {
            self.erc20.total_supply()
        }
        
        fn balance_of(self: @ContractState, account: ContractAddress) -> u256 {
            self.erc20.balance_of(account)
        }
        
        fn allowance(self: @ContractState, owner: ContractAddress, spender: ContractAddress) -> u256 {
            self.erc20.allowance(owner, spender)
        }
    }
    
    #[abi(embed_v0)]
    impl ToKaMintingImpl of IToKaMinting<ContractState> {
        fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
            self.accesscontrol.assert_only_role(MINTER_ROLE);
            self.pausable.assert_not_paused();
            
            let current_supply = self.erc20.total_supply();
            let new_supply = current_supply + amount;
            assert!(new_supply <= self.cap.read(), "Cap exceeded");
            
            self.erc20.mint(to, amount);
        }
        
        fn get_cap(self: @ContractState) -> u256 {
            self.cap.read()
        }
    }
    
    #[abi(embed_v0)]
    impl ToKaBurningImpl of IToKaBurning<ContractState> {
        fn burn(ref self: ContractState, amount: u256) {
            self.pausable.assert_not_paused();
            let caller = get_caller_address();
            self.erc20.burn(caller, amount);
        }
        
        fn burn_from(ref self: ContractState, account: ContractAddress, amount: u256) {
            self.pausable.assert_not_paused();
            let caller = get_caller_address();
            
            if caller != account {
                let current_allowance = self.erc20.allowance(account, caller);
                assert!(current_allowance >= amount, "Insufficient allowance");
                self.erc20._approve(account, caller, current_allowance - amount);
            }
            
            self.erc20.burn(account, amount);
        }
    }
    
    #[abi(embed_v0)]
    impl ToKaPausableImpl of IToKaPausable<ContractState> {
        fn pause(ref self: ContractState) {
            self.accesscontrol.assert_only_role(PAUSER_ROLE);
            self.pausable.pause();
        }
        
        fn unpause(ref self: ContractState) {
            self.accesscontrol.assert_only_role(PAUSER_ROLE);
            self.pausable.unpause();
        }
    
    }
    
    // Remove this implementation since AccessControlImpl already provides these functions
    // #[abi(embed_v0)]
    // impl ToKaAccessControlImpl of IToKaAccessControl<ContractState> {
    //     fn grant_role(ref self: ContractState, role: felt252, account: ContractAddress) {
    //         self.accesscontrol.grant_role(role, account);
    //     }
    //     
    //     fn revoke_role(ref self: ContractState, role: felt252, account: ContractAddress) {
    //         self.accesscontrol.revoke_role(role, account);
    //     }
    //     
    //     fn has_role(self: @ContractState, role: felt252, account: ContractAddress) -> bool {
    //         self.accesscontrol.has_role(role, account)
    //     }
    //     
    //     fn get_role_admin(self: @ContractState, role: felt252) -> felt252 {
    //         self.accesscontrol.get_role_admin(role)
    //     }
    // }
}