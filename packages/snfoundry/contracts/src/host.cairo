use starknet::ContractAddress;
use core::serde::Serde;


#[derive(Drop, Serde, starknet::Store)]
struct Host {
    host: ContractAddress,
    //metadata: ByteArray,
    //date: u64,
    //kycDocHash: ByteArray,
   //MVP data
    fullName: ByteArray,
    email: ByteArray,
    phone: ByteArray,
    country: ByteArray,
    //state: ByteArray,
    //city: ByteArray,
    //address: ByteArray,
    //postalCode: ByteArray,
    //passportNumber: ByteArray,
    //passportExpiry: u64,
    birthDate: u64,
    
}

#[starknet::interface]
trait IHostContract <TContractState> {
    fn getHost(self: @TContractState, id: u64) -> Host;
    fn getHostId(self: @TContractState, contractAddress: ContractAddress) -> u64;
    fn insertHost(ref self: TContractState, host: Host) -> u64;
}

#[starknet::contract]
mod host {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //imports
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    use openzeppelin_access::ownable::OwnableComponent;
   use starknet::storage::{
    Map,
    StoragePathEntry,
    StoragePointerReadAccess,
    StoragePointerWriteAccess
    };
    use starknet::{get_block_timestamp,ContractAddress, get_caller_address, get_contract_address};
    
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //constants
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    use super::*;

    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //storage
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    #[storage]
    struct Storage {
        hosts: Map<u64, Host>,
        hostIds: Map<ContractAddress, u64>,
        hostCount: u64,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //constructor
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    #[constructor]
    fn constructor(
        ref self: ContractState,
        owner: ContractAddress
    ) {
        self.ownable.initializer(owner);
        self.hostCount.write(0);
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //implementation 
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #[abi(embed_v0)]
    impl HostImpl of super::IHostContract<ContractState> {
        fn getHost(self: @ContractState, id: u64) -> Host {
           
           let host = self.hosts.entry(id).read();
           host
        }

        fn getHostId(self: @ContractState, contractAddress: ContractAddress) -> u64 {
            let id = self.hostIds.entry(contractAddress).read();
            id
        }

        fn insertHost(ref self: ContractState, host: Host) -> u64 {
            let id = self.hostCount.read();
            self.hosts.entry(id).write(host);
            self.hostCount.write(id + 1);

            self.emit(
                HostRegistered {
                hostId: id,
                ownerAddress: get_caller_address(),
                metadataHash: "0x",
                timestamp: get_block_timestamp()
            }
        );
            id
        }

    }


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //events 
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        OwnableEvent: OwnableComponent::Event,
        HostRegistered : HostRegistered
    }
   
    #[derive(Drop, starknet::Event)]
    struct HostRegistered {
        hostId: u64,
        ownerAddress: ContractAddress,
        metadataHash: ByteArray,
        timestamp: u64,
    }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//public functions
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  fn getIdKeyNext(self: @ContractState) -> u64 {
    let id = self.hostCount.read();
    id
  }
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//private functions
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

   

}
