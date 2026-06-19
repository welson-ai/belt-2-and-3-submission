#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, Symbol, symbol_short};

#[contract]
pub struct StellarPaymentContract;

#[contractimpl]
impl StellarPaymentContract {
    pub fn initialize(env: Env, admin: Address) {
        env.storage().instance().set(&symbol_short!("admin"), &admin);
    }

    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage().instance().get(&symbol_short!("admin"))
    }

    pub fn record_payment(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
        asset: String,
    ) {
        let sequence = env.ledger().sequence();

        let transaction_data = (
            from.clone(),
            to.clone(),
            amount,
            asset.clone(),
            env.ledger().timestamp(),
        );

        // Use sequence number (u32) directly as the storage key
        env.storage().instance().set(&sequence, &transaction_data);

        let counter: u32 = env.storage().instance()
            .get(&symbol_short!("counter"))
            .unwrap_or(0);
        env.storage().instance().set(&symbol_short!("counter"), &(counter + 1));
    }

    pub fn get_transaction(env: Env, sequence: u32) -> Option<(Address, Address, i128, String, u64)> {
        env.storage().instance().get(&sequence)
    }

    pub fn get_transaction_count(env: Env) -> u32 {
        env.storage().instance()
            .get(&symbol_short!("counter"))
            .unwrap_or(0)
    }

    pub fn update_admin(env: Env, new_admin: Address) {
        env.storage().instance().set(&symbol_short!("admin"), &new_admin);
    }

    pub fn get_info(env: Env) -> (Option<Address>, u32) {
        let admin = env.storage().instance().get(&symbol_short!("admin"));
        let counter = env.storage().instance()
            .get(&symbol_short!("counter"))
            .unwrap_or(0);
        (admin, counter)
    }
}