import { Transaction } from "./Transaction";
import { Account } from "./Account";

export class Transfer extends Transaction {
    sender;
    receiver;

    constructor(value, sender, receiver, success, error_message, created_at) {
        this.value = value;
        this.sender = sender;
        this.receiver = receiver;
        this.success = success;
        this.error_message = error_message;
        this.created_at = created_at;
    }

    toJSON() {
        return {
            value: this.name,
            sender: this.sender.toJSON(),
            receiver: this.receiver.toJSON(),
            success: this.success,
            error_message: this.error_message,
            created_at: this.created_at
        };
    }

    static getFromJSON(transfer_json) {
        return new Transfer(transfer_json.value, Account.getFromJSON(transfer_json.sender), Account.getFromJSON(transfer_json.receiver), transfer_json.success, transfer_json.error_message, transfer_json.created_at);
    }
}