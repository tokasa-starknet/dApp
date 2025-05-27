use starknet::ContractAddress;
use starknet::get_caller_address;
use openzeppelin_access::ownable::OwnableComponent;
use property::{IPropertyContractDispatcher, IPropertyContractDispatcherTrait};

#[starknet::interface]
trait IEarningDistributor<TContractState> {
    // Obtiene el balance disponible para distribuir de una propiedad
    fn get_available_balance(self: @TContractState, property_id: u64) -> u256;
    
    // Distribuye las ganancias a los holders de tokens
    fn distribute_earnings(ref self: TContractState, property_id: u64) -> bool;
    
    // Obtiene las ganancias pendientes de cobrar para un holder específico
    fn get_pending_earnings(self: @TContractState, property_id: u64, holder: ContractAddress) -> u256;
    
    // Permite a un holder reclamar sus ganancias
    fn claim_earnings(ref self: TContractState, property_id: u64) -> bool;
}

#[starknet::contract]
mod earning_distributor {
    use super::*;
    use starknet::get_block_timestamp;

    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    
    #[abi(embed_v0)]
    impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        property_contract: ContractAddress,
        // Mapeo de propiedad a balance disponible para distribuir
        available_balance: Map<u64, u256>,
        // Mapeo de propiedad a último timestamp de distribución
        last_distribution: Map<u64, u64>,
        // Mapeo de propiedad a ganancias pendientes por holder
        pending_earnings: Map<(u64, ContractAddress), u256>,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        EarningsDistributed: EarningsDistributed,
        EarningsClaimed: EarningsClaimed,
    }

    #[derive(Drop, starknet::Event)]
    struct EarningsDistributed {
        property_id: u64,
        total_amount: u256,
        timestamp: u64,
    }

    #[derive(Drop, starknet::Event)]
    struct EarningsClaimed {
        property_id: u64,
        holder: ContractAddress,
        amount: u256,
        timestamp: u64,
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, property_contract: ContractAddress) {
        self.ownable.initializer(owner);
        self.property_contract.write(property_contract);
    }

    #[abi(embed_v0)]
    impl EarningDistributorImpl of super::IEarningDistributor<ContractState> {
        fn get_available_balance(self: @ContractState, property_id: u64) -> u256 {
            self.available_balance.entry(property_id).read()
        }

        fn distribute_earnings(ref self: ContractState, property_id: u64) -> bool {
            // TODO: Implementar la lógica de distribución
            // 1. Obtener el último earning de la propiedad
            // 2. Obtener la lista de holders y sus porcentajes
            // 3. Calcular la distribución para cada holder
            // 4. Actualizar los balances pendientes
            // 5. Emitir evento
            true
        }

        fn get_pending_earnings(self: @ContractState, property_id: u64, holder: ContractAddress) -> u256 {
            self.pending_earnings.entry((property_id, holder)).read()
        }

        fn claim_earnings(ref self: ContractState, property_id: u64) -> bool {
            let caller = get_caller_address();
            let pending = self.pending_earnings.entry((property_id, caller)).read();
            assert(pending > 0, 'No pending earnings');

            // TODO: Implementar la transferencia de fondos
            // 1. Transferir los fondos al holder
            // 2. Actualizar el balance pendiente
            // 3. Emitir evento

            self.emit(
                EarningsClaimed {
                    property_id,
                    holder: caller,
                    amount: pending,
                    timestamp: get_block_timestamp(),
                }
            );
            true
        }
    }
} 