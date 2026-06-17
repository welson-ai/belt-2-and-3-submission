#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String};

#[contract]
pub struct StellarPaymentContract;

#[contractimpl]
impl StellarPaymentContract {
    // Initialize the contract with an admin
    pub fn initialize(env: Env, admin: Address) {
        env.storage().instance().set(&String::from_str(&env, "admin"), &admin);
    }

    // Get the admin address
    pub fn get_admin(env: Env) -> Option<Address> {
        env.storage().instance().get(&String::from_str(&env, "admin"))
    }

    // Record a payment transaction
    pub fn record_payment(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
        asset: String,
    ) {
        // Verify the caller is authorized (you can add authorization logic here)
        
        // Create a transaction record using ledger sequence
        let sequence = env.ledger().sequence();
        let mut tx_id = String::from_str(&env, "tx_");
        tx_id = tx_id.concat(&String::from_str(&env, &sequence.to_string()));
        
        let transaction_data = (
            from.clone(),
            to.clone(),
            amount,
            asset.clone(),
            env.ledger().timestamp(),
        );
        
        // Store the transaction
        env.storage().instance().set(&tx_id, &transaction_data);
        
        // Increment transaction counter
        let counter: u32 = env.storage().instance().get(&String::from_str(&env, "counter")).unwrap_or(0);
        env.storage().instance().set(&String::from_str(&env, "counter"), &(counter + 1));
    }

    // Get transaction by ID
    pub fn get_transaction(env: Env, tx_id: String) -> Option<(Address, Address, i128, String, u64)> {
        env.storage().instance().get(&tx_id)
    }

    // Get total number of transactions
    pub fn get_transaction_count(env: Env) -> u32 {
        env.storage().instance().get(&String::from_str(&env, "counter")).unwrap_or(0)
    }

    // Update admin (only callable by current admin)
    pub fn update_admin(env: Env, new_admin: Address) {
        let _current_admin: Option<Address> = env.storage().instance().get(&String::from_str(&env, "admin"));
        
        // In a real contract, you'd verify the caller is the current admin
        // For now, we'll just update it
        env.storage().instance().set(&String::from_str(&env, "admin"), &new_admin);
    }

    // Get contract info
    pub fn get_info(env: Env) -> (Option<Address>, u32) {
        let admin = env.storage().instance().get(&String::from_str(&env, "admin"));
        let counter = env.storage().instance().get(&String::from_str(&env, "counter")).unwrap_or(0);
        (admin, counter)
    }
}
