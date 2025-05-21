#[starknet::contract]
mod kasaSale{

   
    use contracts::ToKasaFractionalAssets::{IToKasaFractionalAssetsDispatcher, IToKasaFractionalAssetsDispatcherTrait};
    use openzeppelin_token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    
    use starknet::storage::{
        Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
        Vec, VecTrait,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};
    use openzeppelin_access::ownable::OwnableComponent;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[starknet::interface]
    trait IKasaSaleContract<TContractState> {
        fn buy(ref self: TContractState, token: ContractAddress, amount: u64);
    }

    #[storage]
    struct Storage{
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
        tokasa_contract: ContractAddress
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, tokasa_contract: ContractAddress){
        self.ownable.initializer(owner);
        self.tokasa_contract.write(tokasa_contract);
    }

   
    #[abi(embed_v0)]
    impl KasaSaleContract of IKasaSaleContract<ContractState>{
   
    
    fn buy(ref self: ContractState, token: ContractAddress, amount: u64){
        // Aquí irá la lógica de compra
    }


    
}

#[event]
#[derive(Drop, starknet::Event)]
enum Event {
    #[flat]
    OwnableEvent: OwnableComponent::Event
}
}