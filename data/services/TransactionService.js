import { Deposit } from "../models/Deposit";
import { Withdraw } from "../models/Withdraw";
import { DataService } from "./DataService";
import { Transfer } from "../models/Transfer";

export class TransactionService {

    static makeDeposit(value, account) {
        account.balance += value;
        const new_deposit = new Deposit(value, account, new Date());
        account.transactions.push(new_deposit);
        DataService.saveAccountData(account);
        return new_deposit.toJSON();
    }

    static makeWithdraw(value, account) {
        let new_withdraw;
        if(value <= account.balance) {
            account.balance -= value;
            new_withdraw = new Withdraw(value, account, true, "", new Date());
            account.transactions.push(new_withdraw);
            DataService.saveAccountData(account);
        } else {
            new_withdraw = new Withdraw(value, account, false, "Saldo insuficiente para realizar o saque.", new Date());
            account.transactions.push(new_withdraw);
            DataService.saveAccountData(account);
        }
        return new_withdraw.toJSON();
    }

    static makeTransfer(value, sender, receiver) {
        let new_transfer;
        if(value <= sender.balance) {
            sender.balance -= value;
            receiver.balance += value;
            new_transfer = new Transfer(value, sender, receiver, true, "", new Date());
            sender.transactions.push(new_transfer);
            DataService.saveAccountData(sender);
        } else {
            new_transfer = new Transfer(value, sender, receiver, false, "Saldo insuficiente para realizar a transferência.", new Date());
            sender.transactions.push(new_transfer);
            DataService.saveAccountData(sender);
        }
        return new_transfer.toJSON();
    }
}