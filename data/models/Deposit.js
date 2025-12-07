import { Account } from "./Account";
import { Transaction } from "./Transaction";

export class Deposit extends Transaction {
    account;

    constructor(value, account, created_at) {
        this.value = value;
        this.account = account;
        this.success = true;
        this.error_message = "";
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

    static getFromJSON(deposit_json) {
        return new Deposit(deposit_json.value, Account.getFromJSON(deposit_json.account), deposit_json.created_at);
    }
}