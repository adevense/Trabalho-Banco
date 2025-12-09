import { Account } from "./Account.js";
import { Transaction } from "./Transaction.js";

export class Transfer extends Transaction {
    constructor(value, sender, receiver, success, error_message, created_at) {
        super(value, success, error_message, created_at);
        this.sender = sender;
        this.receiver = receiver;
        this.type = 'transfer';
    }

    toJSON() {
        return {
            type: this.type,
            value: this.value,
            sender_id: this.sender.id,
            receiver_id: this.receiver.id,
            success: this.success,
            error_message: this.error_message,
            created_at: this.created_at
        };
    }
}