use core::serde::Serde;
use starknet::ContractAddress;
use starknet::storage::Vec;

#[derive(Drop, Serde, starknet::Store)]
struct Property {
    hostId: u64,
    verificationStatus: u8,
    title: ByteArray,
    description: ByteArray,
    address: ByteArray,
    latitude: ByteArray,
    longitude: ByteArray,
    amenities: ByteArray,
    annualYield: u64,
    url: ByteArray,
    metadata_ipfs_hash: ByteArray,
    image_ipfs_hash: ByteArray,
    //principal document tokenized
    contract_ipfs_hash_token: ByteArray,
    legal_contract_signature: ByteArray,
}

#[starknet::interface]
trait IPropertyContract<TContractState> {
    fn getProperty(self: @TContractState, id: u64) -> Property;
    fn getPropertiesIdByHostId(self: @TContractState, hostId: u64) -> Array<u64>;
    //hostId is the id of the host that is registering the property
    //this data is temporary for the hackaton
    //i will be removed after the hackaton and call the host contract
    fn insertProperty(ref self: TContractState, property: Property, hostId: u64) -> u64;
}

#[starknet::contract]
mod property {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //imports
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    use core::array::{Array, ArrayTrait};
    use core::dict::Felt252DictTrait;
    use openzeppelin_access::ownable::OwnableComponent;
    use starknet::storage::{
        Map, MutableVecTrait, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess,
        Vec, VecTrait,
    };
    use starknet::{ContractAddress, get_block_timestamp, get_caller_address, get_contract_address};

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
        properties: Map<u64, Property>,
        propertyHostId: Map<u64, Vec<u64>>,
        propertyCount: u64,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //constructor
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        self.ownable.initializer(owner);
        self.propertyCount.write(0);
    }


    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //implementation
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    #[abi(embed_v0)]
    impl PropertyImpl of super::IPropertyContract<ContractState> {
        fn getProperty(self: @ContractState, id: u64) -> Property {
            let property = self.properties.entry(id).read();
            property
        }

        fn getPropertiesIdByHostId(self: @ContractState, hostId: u64) -> Array<u64> {
            let mut result: Array<u64> = ArrayTrait::new();
            let vec = @self.propertyHostId.entry(hostId);
            let vec_len = vec.len();
            assert(vec_len > 0, 'No properties found for hostId');

            let mut i = 0;

            loop {
                if i == vec_len {
                    break;
                }
                result.append(vec.at(i).read());

                i += 1;
            }

            result
        }

        fn insertProperty(ref self: ContractState, property: Property, hostId: u64) -> u64 {
            let propertyId = self.propertyCount.read();
            let mut propertyAux = property;
            propertyAux.hostId = hostId;

            self.properties.entry(propertyId).write(propertyAux);
            // propertyHostId: Map<u64, Array<u64>>,
            self.propertyHostId.entry(hostId).append().write(propertyId);

            self.propertyCount.write(propertyId + 1);

            self
                .emit(
                    PropertyRegistered {
                        propertyId: propertyId,
                        ownerAddress: get_caller_address(),
                        metadataHash: "0x0",
                        timestamp: get_block_timestamp(),
                    },
                );

            propertyId
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
        PropertyRegistered: PropertyRegistered,
    }

    #[derive(Drop, starknet::Event)]
    struct PropertyRegistered {
        propertyId: u64,
        ownerAddress: ContractAddress,
        metadataHash: ByteArray,
        timestamp: u64,
    }
}

