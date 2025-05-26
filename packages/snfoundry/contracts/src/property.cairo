use core::serde::Serde;
use starknet::ContractAddress;
use starknet::storage::Vec;
use starknet::storage::Map;

#[derive(Drop, Serde, starknet::Store)]
struct Earning {
    earning: u64,
    date: felt252,
    percentageToPay: u64,
    mounthlyEarnings: u64,
    paid: bool
}

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
    saleableTokenPercentage: u64,
  
}

#[starknet::interface]
trait IPropertyContract<TContractState> {
    fn getProperty(self: @TContractState, id: u64) -> Property;
    fn getPropertiesIdByHostId(self: @TContractState, hostId: u64) -> Array<u64>;
    //hostId is the id of the host that is registering the property
    //this data is temporary for the hackaton
    //i will be removed after the hackaton and call the host contract
    fn insertProperty(ref self: TContractState, property: Property, hostId: u64) -> u64;
    
    // Nuevos métodos para manejar earnings
    fn get_property_earnings(self: @TContractState, property_id: u64) -> Array<Earning>;
    fn get_latest_earning(self: @TContractState, property_id: u64) -> Option<Earning>;
    fn add_earning(ref self: TContractState, property_id: u64, earning: Earning);
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
        //<propertyId, Earning>
        earnings: Map<u64, Earning>,
        // Mantiene un contador de earnings por propiedad
        property_earnings_count: Map<u64, u64>,
        // Mantiene un array ordenado de IDs de earnings por propiedad
        property_earnings_timeline: Map<u64, Vec<u64>>,
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

        fn get_property_earnings(self: @ContractState, property_id: u64) -> Array<Earning> {
            let mut result: Array<Earning> = ArrayTrait::new();
            let timeline = @self.property_earnings_timeline.entry(property_id);
            let timeline_len = timeline.len();

            let mut i = 0;
            loop {
                if i == timeline_len {
                    break;
                }
                let earning_id = timeline.at(i).read();
                result.append(self.earnings.entry(earning_id).read());
                i += 1;
            };
            
            result
        }

        fn get_latest_earning(self: @ContractState, property_id: u64) -> Option<Earning> {
            let timeline = @self.property_earnings_timeline.entry(property_id);
            let timeline_len = timeline.len();
            
            if timeline_len == 0 {
                return Option::None;
            }
            
            let latest_earning_id = timeline.at(timeline_len - 1).read();
            Option::Some(self.earnings.entry(latest_earning_id).read())
        }

        fn add_earning(ref self: ContractState, property_id: u64, earning: Earning) {
            // Obtener y actualizar el contador de earnings
            let earning_count = self.property_earnings_count.entry(property_id).read();
            let earning_id = earning_count + 1;
            
            // Guardar el earning
            self.earnings.entry(earning_id).write(earning);
            
            // Actualizar el timeline
            self.property_earnings_timeline.entry(property_id).append().write(earning_id);
            
            // Actualizar el contador
            self.property_earnings_count.entry(property_id).write(earning_id);
        }
    }

    // Agregar función helper para obtener los earnings de una propiedad ordenados cronológicamente
    #[generate_trait]
    impl PropertyHelperImpl of PropertyHelperTrait {
        fn get_property_earnings(self: @ContractState, property_id: u64) -> Array<Earning> {
            let mut result: Array<Earning> = ArrayTrait::new();
            let timeline = @self.property_earnings_timeline.entry(property_id);
            let timeline_len = timeline.len();

            let mut i = 0;
            loop {
                if i == timeline_len {
                    break;
                }
                let earning_id = timeline.at(i).read();
                result.append(self.earnings.entry(earning_id).read());
                i += 1;
            };
            
            result
        }

        fn get_latest_earning(self: @ContractState, property_id: u64) -> Option<Earning> {
            let timeline = @self.property_earnings_timeline.entry(property_id);
            let timeline_len = timeline.len();
            
            if timeline_len == 0 {
                return Option::None;
            }
            
            let latest_earning_id = timeline.at(timeline_len - 1).read();
            Option::Some(self.earnings.entry(latest_earning_id).read())
        }

        fn add_earning(ref self: ContractState, property_id: u64, earning: Earning) {
            // Obtener y actualizar el contador de earnings
            let earning_count = self.property_earnings_count.entry(property_id).read();
            let earning_id = earning_count + 1;
            
            // Guardar el earning
            self.earnings.entry(earning_id).write(earning);
            
            // Actualizar el timeline
            self.property_earnings_timeline.entry(property_id).append().write(earning_id);
            
            // Actualizar el contador
            self.property_earnings_count.entry(property_id).write(earning_id);
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

