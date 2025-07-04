use core::traits::Into;
use core::serde::Serde;
use starknet::ContractAddress;
use integer::u256_from_felt252;
use openzeppelin::access::accesscontrol::AccessControlComponent;
use openzeppelin::token::erc20::erc20::ERC20Component;
use openzeppelin::utils::pausable::PausableComponent;

#[starknet::contract]
mod toka_token {
    use super::*;
    use starknet::storage::{Storage, StoragePtr};
    use starknet::{get_caller_address, get_block_timestamp};

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);
    component!(path: AccessControlComponent, storage: accesscontrol, event: AccessControlEvent);
    component!(path: PausableComponent, storage: pausable, event: PausableEvent);

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        #[substorage(v0)]
        accesscontrol: AccessControlComponent::Storage,
        #[substorage(v0)]
        pausable: PausableComponent::Storage,
        cap: u256,
    }

    #[constructor]
    fn constructor(ref self: ContractState, admin: ContractAddress) {
        let name = 'ToKa';
        let symbol = 'TKA';
        let decimals: u8 = 18;
        let cap = u256_from_felt252(100_000_000_u128 * 10u128.pow(decimals.into()));

        self.erc20.initializer(name, symbol, decimals);
        self.accesscontrol.initializer(admin);
        self.pausable.initializer();

        self.cap.write(cap);

        self.accesscontrol.grant_role('DEFAULT_ADMIN_ROLE', admin);
        self.accesscontrol.grant_role('MINTER_ROLE', admin);
        self.accesscontrol.grant_role('PAUSER_ROLE', admin);
    }

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;

    #[abi(embed_v0)]
    impl AccessControlImpl = AccessControlComponent::AccessControlImpl<ContractState>;

    #[abi(embed_v0)]
    impl PausableImpl = PausableComponent::PausableImpl<ContractState>;

    #[external]
    fn mint(ref self: ContractState, to: ContractAddress, amount: u256) {
        let caller = get_caller_address();
        assert(self.accesscontrol.has_role('MINTER_ROLE', caller), 'NotMinter');

        let total_supply = self.erc20.total_supply();
        let cap = self.cap.read();
        assert(total_supply + amount <= cap, 'CapExceeded');

        self.erc20._mint(to, amount);
    }

    #[external]
    fn burn(ref self: ContractState, amount: u256) {
        let caller = get_caller_address();
        self.erc20._burn(caller, amount);
    }

    #[external]
    fn pause(ref self: ContractState) {
        let caller = get_caller_address();
        assert(self.accesscontrol.has_role('PAUSER_ROLE', caller), 'NotPauser');
        self.pausable._pause();
    }

    #[external]
    fn unpause(ref self: ContractState) {
        let caller = get_caller_address();
        assert(self.accesscontrol.has_role('PAUSER_ROLE', caller), 'NotPauser');
        self.pausable._unpause();
    }

    #[abi(embed_v0)]
    impl CustomERC20 of ICustomERC20 {
        fn cap(self: @ContractState) -> u256 {
            self.cap.read()
        }
    }

    #[starknet::interface]
    trait ICustomERC20<TContractState> {
        fn cap(self: @TContractState) -> u256;
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat] ERC20Event: ERC20Component::Event,
        #[flat] AccessControlEvent: AccessControlComponent::Event,
        #[flat] PausableEvent: PausableComponent::Event,
    }
} 
