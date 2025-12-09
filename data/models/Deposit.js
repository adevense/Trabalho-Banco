import { Account } from "./Account.js";
import { Transaction } from "./Transaction.js";

export class Deposit extends Transaction {
    constructor(value, account, created_at) {
        super(value, true, "", created_at); 
        this.account = account;
        this.type = 'deposit';
    }

    toJSON() {
        return {
            type: this.type,
            value: this.value,
            account_id: this.account.id,
            success: this.success,
            error_message: this.error_message,
            created_at: this.created_at
        };
    }
}