import { Transaction } from "./Transaction.js";

export class Account {
    constructor(id, name, email, password, cpf, cep, balance = 0, transactions = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.cpf = cpf;
        this.cep = cep;
        this.balance = balance;
        this.transactions = transactions;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            cpf: this.cpf,
            cep: this.cep,
            balance: this.balance,
            transactions: this.transactions,
        };
    }
}