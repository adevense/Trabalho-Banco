export class Account {
    id;
    name;
    email;
    password;
    cpf;
    cep;
    balance;
    transactions;

    constructor (id, name, email, password, cpf, cep, balance, transactions) {
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
            transactions: this.transactions
        };
    }

    static getFromJSON(account_json) {
        return new Account(account_json.id, account_json.name, account_json.email, account_json.password, account_json.cpf, account_json.cep, account_json.balance, account_json.transactions);
    }
}