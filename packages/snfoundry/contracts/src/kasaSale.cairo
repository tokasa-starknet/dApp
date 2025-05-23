#[starknet::contract]
mod kasaSale{

   
    use contracts::ToKasaFractionalAssets::{IToKasaFractionalAssetsDispatcher, IToKasaFractionalAssetsDispatcherTrait};
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use openzeppelin_token::erc1155::interface::{IERC1155Dispatcher, IERC1155DispatcherTrait};
    
    use starknet::storage::{
        Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
        Vec, VecTrait,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address,contract_address_const};
    use openzeppelin_access::ownable::OwnableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;




    #[starknet::interface]
    trait IKasaSaleContract<TContractState> {
        fn buy(ref self: TContractState,  amount: u256);
    }

    const TOKEN_STRK_ADDRESS: felt252 =
         0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d;

    #[storage]
    struct Storage{
        owner: ContractAddress,
        tokasa_contract: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
       
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, tokasa_contract: ContractAddress){
        self.owner.write(owner);
        self.ownable.initializer(owner);
        self.tokasa_contract.write(tokasa_contract);
    }

   
    #[abi(embed_v0)]
    impl KasaSaleContract of IKasaSaleContract<ContractState>{
   
    
    fn buy(ref self: ContractState,  amount: u256){
        // happy path
        //without validation
        let caller = get_caller_address();
        //se obtienen los fondos
         let stark_dispatcher = IERC20Dispatcher {
            contract_address: contract_address_const::<TOKEN_STRK_ADDRESS>(),
        };
        stark_dispatcher.transfer_from(caller, get_contract_address(), amount);
        //se pasan los Kasa al caller
        let tokasa_dispatcher = IERC1155Dispatcher {
            contract_address: self.tokasa_contract.read(),
        };
        tokasa_dispatcher.safe_transfer_from(self.owner.read(), caller, 1, amount, ArrayTrait::new().span());
    }


    
}

#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    #[flat]
    OwnableEvent: OwnableComponent::Event
}
}