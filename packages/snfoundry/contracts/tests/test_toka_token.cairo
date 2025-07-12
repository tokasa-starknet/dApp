use core::traits::Into;
use core::serde::Serde;
use starknet::ContractAddress;
use starknet::contract_address_const;
use starknet::testing::{set_caller_address, set_contract_address};
use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address};

use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
use core::num::traits::Pow;

// Re-declare the interfaces here to generate the dispatchers
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
    fn is_paused(self: @TContractState) -> bool;
}

#[starknet::interface]
trait IToKaAccessControl<TContractState> {
    fn grant_role(ref self: TContractState, role: felt252, account: ContractAddress);
    fn revoke_role(ref self: TContractState, role: felt252, account: ContractAddress);
    fn has_role(self: @TContractState, role: felt252, account: ContractAddress) -> bool;
    fn get_role_admin(self: @TContractState, role: felt252) -> felt252;
}

// Test constants
const ADMIN: felt252 = 'admin';
const USER1: felt252 = 'user1';
const USER2: felt252 = 'user2';
const MINTER: felt252 = 'minter';
const PAUSER: felt252 = 'pauser';

fn ADMIN_ADDR() -> ContractAddress {
    contract_address_const::<ADMIN>()
}

fn USER1_ADDR() -> ContractAddress {
    contract_address_const::<USER1>()
}

fn USER2_ADDR() -> ContractAddress {
    contract_address_const::<USER2>()
}

fn MINTER_ADDR() -> ContractAddress {
    contract_address_const::<MINTER>()
}

fn PAUSER_ADDR() -> ContractAddress {
    contract_address_const::<PAUSER>()
}

// Role constants (matching the contract)
const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");
const DEFAULT_ADMIN_ROLE: felt252 = 0;
const PAUSER_ROLE: felt252 = selector!("PAUSER_ROLE");

fn deploy_contract() -> ContractAddress {
    let contract = declare("TokaToken").unwrap().contract_class();
    let mut constructor_calldata = array![ADMIN_ADDR().into()];
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();
    contract_address
}

#[test]
fn test_constructor() {
    let contract_address = deploy_contract();
    
    let erc20 = IERC20Dispatcher { contract_address };
    let access_control = IToKaAccessControlDispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    
    // Test initial supply is zero
    assert!(erc20.total_supply() == 0, "Initial supply should be zero");
    
    // Test cap is set correctly (100 million * 10^18)
    let expected_cap = u256 { low: 100_000_000_u128 * Pow::pow(10_u128, 18), high: 0 };
    assert!(minting.get_cap() == expected_cap, "Wrong cap value");
    
    // Test admin has correct roles
    assert!(access_control.has_role(DEFAULT_ADMIN_ROLE, ADMIN_ADDR()), "Admin should have admin role");
    assert!(access_control.has_role(MINTER_ROLE, ADMIN_ADDR()), "Admin should have minter role");
    assert!(access_control.has_role(PAUSER_ROLE, ADMIN_ADDR()), "Admin should have pauser role");
}

#[test]
fn test_minting_success() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    
    assert!(erc20.balance_of(USER1_ADDR()) == mint_amount, "User1 should have minted tokens");
    assert!(erc20.total_supply() == mint_amount, "Total supply should equal minted amount");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Caller is missing role',))]
fn test_minting_unauthorized() {
    let contract_address = deploy_contract();
    let minting = IToKaMintingDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, USER1_ADDR());
    
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
}

#[test]
#[should_panic(expected: ('Cap exceeded',))]
fn test_minting_exceeds_cap() {
    let contract_address = deploy_contract();
    let minting = IToKaMintingDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    
    // Try to mint more than cap
    let over_cap = u256 { low: 100_000_001_u128 * Pow::pow(10_u128, 18), high: 0 };
    minting.mint(USER1_ADDR(), over_cap);
}

#[test]
fn test_burning_success() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    let burning = IToKaBurningDispatcher { contract_address };
    
    // First mint some tokens
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    stop_cheat_caller_address(contract_address);
    
    // Now burn some tokens
    start_cheat_caller_address(contract_address, USER1_ADDR());
    let burn_amount = u256 { low: 300_u128, high: 0 };
    burning.burn(burn_amount);
    
    let expected_balance = mint_amount - burn_amount;
    assert!(erc20.balance_of(USER1_ADDR()) == expected_balance, "Balance should be reduced after burn");
    assert!(erc20.total_supply() == expected_balance, "Total supply should be reduced after burn");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_burn_from_with_allowance() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    let burning = IToKaBurningDispatcher { contract_address };
    
    // Mint tokens to USER1
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    stop_cheat_caller_address(contract_address);
    
    // USER1 approves USER2 to spend tokens
    start_cheat_caller_address(contract_address, USER1_ADDR());
    let allowance_amount = u256 { low: 500_u128, high: 0 };
    erc20.approve(USER2_ADDR(), allowance_amount);
    stop_cheat_caller_address(contract_address);
    
    // USER2 burns tokens from USER1
    start_cheat_caller_address(contract_address, USER2_ADDR());
    let burn_amount = u256 { low: 300_u128, high: 0 };
    burning.burn_from(USER1_ADDR(), burn_amount);
    
    let expected_balance = mint_amount - burn_amount;
    let expected_allowance = allowance_amount - burn_amount;
    
    assert!(erc20.balance_of(USER1_ADDR()) == expected_balance, "USER1 balance should be reduced");
    assert!(erc20.allowance(USER1_ADDR(), USER2_ADDR()) == expected_allowance, "Allowance should be reduced");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Insufficient allowance',))]
fn test_burn_from_insufficient_allowance() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    let burning = IToKaBurningDispatcher { contract_address };
    
    // Mint tokens to USER1
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    stop_cheat_caller_address(contract_address);
    
    // USER1 approves USER2 for small amount
    start_cheat_caller_address(contract_address, USER1_ADDR());
    let allowance_amount = u256 { low: 100_u128, high: 0 };
    erc20.approve(USER2_ADDR(), allowance_amount);
    stop_cheat_caller_address(contract_address);
    
    // USER2 tries to burn more than allowance
    start_cheat_caller_address(contract_address, USER2_ADDR());
    let burn_amount = u256 { low: 300_u128, high: 0 };
    burning.burn_from(USER1_ADDR(), burn_amount);
}

#[test]
fn test_pause_unpause() {
    let contract_address = deploy_contract();
    let pausable = IToKaPausableDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    
    // Initially should not be paused
    assert!(!pausable.is_paused(), "Contract should not be paused initially");
    
    // Pause the contract
    pausable.pause();
    assert!(pausable.is_paused(), "Contract should be paused");
    
    // Unpause the contract
    pausable.unpause();
    assert!(!pausable.is_paused(), "Contract should not be paused after unpause");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
#[should_panic(expected: ('Caller is missing role',))]
fn test_pause_unauthorized() {
    let contract_address = deploy_contract();
    let pausable = IToKaPausableDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, USER1_ADDR());
    pausable.pause();
}

#[test]
#[should_panic(expected: ('Pausable: paused',))]
fn test_transfer_when_paused() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    let pausable = IToKaPausableDispatcher { contract_address };
    
    // Mint tokens and pause contract
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    pausable.pause();
    stop_cheat_caller_address(contract_address);
    
    // Try to transfer when paused
    start_cheat_caller_address(contract_address, USER1_ADDR());
    let transfer_amount = u256 { low: 100_u128, high: 0 };
    erc20.transfer(USER2_ADDR(), transfer_amount);
}

#[test]
#[should_panic(expected: ('Pausable: paused',))]
fn test_mint_when_paused() {
    let contract_address = deploy_contract();
    let minting = IToKaMintingDispatcher { contract_address };
    let pausable = IToKaPausableDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    
    // Pause contract
    pausable.pause();
    
    // Try to mint when paused
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
}

#[test]
fn test_role_management() {
    let contract_address = deploy_contract();
    let access_control = IToKaAccessControlDispatcher { contract_address };
    
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    
    // Grant minter role to USER1
    access_control.grant_role(MINTER_ROLE, USER1_ADDR());
    assert!(access_control.has_role(MINTER_ROLE, USER1_ADDR()), "USER1 should have minter role");
    
    // Revoke minter role from USER1
    access_control.revoke_role(MINTER_ROLE, USER1_ADDR());
    assert!(!access_control.has_role(MINTER_ROLE, USER1_ADDR()), "USER1 should not have minter role");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_erc20_basic_operations() {
    let contract_address = deploy_contract();
    let erc20 = IERC20Dispatcher { contract_address };
    let minting = IToKaMintingDispatcher { contract_address };
    
    // Mint tokens to USER1
    start_cheat_caller_address(contract_address, ADMIN_ADDR());
    let mint_amount = u256 { low: 1000_u128, high: 0 };
    minting.mint(USER1_ADDR(), mint_amount);
    stop_cheat_caller_address(contract_address);
    
    // Test transfer
    start_cheat_caller_address(contract_address, USER1_ADDR());
    let transfer_amount = u256 { low: 300_u128, high: 0 };
    assert!(erc20.transfer(USER2_ADDR(), transfer_amount), "Transfer should succeed");
    
    assert!(erc20.balance_of(USER1_ADDR()) == mint_amount - transfer_amount, "USER1 balance incorrect");
    assert!(erc20.balance_of(USER2_ADDR()) == transfer_amount, "USER2 balance incorrect");
    
    // Test approval and transfer_from
    let approve_amount = u256 { low: 200_u128, high: 0 };
    assert!(erc20.approve(USER2_ADDR(), approve_amount), "Approve should succeed");
    assert!(erc20.allowance(USER1_ADDR(), USER2_ADDR()) == approve_amount, "Allowance incorrect");
    
    stop_cheat_caller_address(contract_address);
    
    // USER2 transfers from USER1
    start_cheat_caller_address(contract_address, USER2_ADDR());
    let transfer_from_amount = u256 { low: 100_u128, high: 0 };
    assert!(erc20.transfer_from(USER1_ADDR(), USER2_ADDR(), transfer_from_amount), "Transfer from should succeed");
    
    let expected_user1_balance = mint_amount - transfer_amount - transfer_from_amount;
    let expected_user2_balance = transfer_amount + transfer_from_amount;
    let expected_allowance = approve_amount - transfer_from_amount;
    
    assert!(erc20.balance_of(USER1_ADDR()) == expected_user1_balance, "USER1 final balance incorrect");
    assert!(erc20.balance_of(USER2_ADDR()) == expected_user2_balance, "USER2 final balance incorrect");
    assert!(erc20.allowance(USER1_ADDR(), USER2_ADDR()) == expected_allowance, "Final allowance incorrect");
    
    stop_cheat_caller_address(contract_address);
}

#[test]
fn test_get_role_admin() {
    let contract_address = deploy_contract();
    let access_control = IToKaAccessControlDispatcher { contract_address };
    
    // DEFAULT_ADMIN_ROLE should be admin of all roles
    assert!(access_control.get_role_admin(MINTER_ROLE) == DEFAULT_ADMIN_ROLE, "Wrong admin for minter role");
    assert!(access_control.get_role_admin(PAUSER_ROLE) == DEFAULT_ADMIN_ROLE, "Wrong admin for pauser role");
}