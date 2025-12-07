import { Account } from "./Account";
import { Transaction } from "./Transaction";

export class Withdraw extends Transaction {
    account;

    constructor(value, account, success, error_message, created_at) {
        this.value = value;
        this.account = account;
        this.success = success;
        this.error_message = error_message;
        this.created_at = created_at;
    }

    toJSON() {
        return {
            value: this.name,
            account: this.account.toJSON(),
            success: this.success,
            error_message: this.error_message,
            created_at: this.created_at
        };
    }

    static getFromJSON(withdraw_json) {
        return new Deposit(withdraw_json.value, Account.getFromJSON(withdraw_json.account), withdraw_json.success, withdraw_json.error_message, withdraw_json.created_at);
    }
}