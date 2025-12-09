import { Account } from "./Account.js";
import { Transaction } from "./Transaction.js";

export class Withdraw extends Transaction {
    constructor(value, account, success, error_message, created_at) {
        super(value, success, error_message, created_at); 
        this.account = account;
        this.type = 'withdraw';
    }

}