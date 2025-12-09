import { Deposit } from "../models/Deposit.js";
import { Withdraw } from "../models/Withdraw.js";
import { Transfer } from "../models/Transfer.js";
import { DataService } from "./DataService.js"; 

export class TransactionService {

    static makeDeposit(value, account) {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue <= 0) {
            return { success: false, message: "Valor de depósito inválido." };
        }

        account.balance += numericValue;
        const new_deposit = new Deposit(numericValue, account, new Date());
        account.transactions.push(new_deposit);
        DataService.saveAccountData(account);
        return { success: true, transaction: new_deposit.toJSON() };
    }

    static makeWithdraw(value, account) {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue <= 0) {
            return { success: false, message: "Valor de saque inválido." };
        }
        
        let new_withdraw;
        let res = { success: true };
        
        if(numericValue <= account.balance) {
            account.balance -= numericValue;
            new_withdraw = new Withdraw(numericValue, account, true, "", new Date());
            account.transactions.push(new_withdraw);
            DataService.saveAccountData(account);
            res.transaction = new_withdraw.toJSON();
        } else {
            new_withdraw = new Withdraw(numericValue, account, false, "Saldo insuficiente para saque.", new Date());
            account.transactions.push(new_withdraw);
            DataService.saveAccountData(account);
            res.success = false;
            res.message = new_withdraw.error_message;
        }
        return res;
    }

    static makeTransfer(value, sender, receiver) {
        const numericValue = parseFloat(value);
        if (isNaN(numericValue) || numericValue <= 0) {
            return { success: false, message: "Valor de transferência inválido." };
        }

        let new_transfer;
        let res = { success: true };
        
        if(numericValue <= sender.balance) {
            sender.balance -= numericValue;
            receiver.balance += numericValue; 
            
            new_transfer = new Transfer(numericValue, sender, receiver, true, "", new Date());
            
            sender.transactions.push(new_transfer);
            DataService.saveAccountData(sender);
            DataService.saveAccountData(receiver); 
            res.transaction = new_transfer.toJSON();
            
        } else {
            new_transfer = new Transfer(numericValue, sender, receiver, false, "Saldo insuficiente para transferência.", new Date());
            sender.transactions.push(new_transfer);
            DataService.saveAccountData(sender);
            res.success = false;
            res.message = new_transfer.error_message;
        }
        return res;
    }
}