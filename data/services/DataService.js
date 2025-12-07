import { Account } from "../models/Account";

export class DataService {

    static saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getData(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    static getCurrentAccount() {
        return this.getAccountByID(this.getData('currentAccount'));
    }

    static getAccountByID(id) {
        const data = this.getData('accounts') || [];
        return data.find((value) => { value.id === id });
    }

    static saveAccountData(account) {
        const data = this.getData('accounts') || [];
        const index = data.findIndex((value) => { value.id === account.id });
        data[index] = account;
        this.saveData('accounts', data);
    }

    static createAccount(name, email, password, cpf, cep) {
        if(!name || !email || !password || !cpf || !cep) {
            return {
                success: false,
                message: 'Preencha todos os campos.'
            };
        }

        const accounts = this.getData('accounts') || [];

        if(accounts.find((value) => value.email === email)) {
            return {
                success: false,
                message: 'Já existe uma conta criada com esse email.'
            };
        }

        if(accounts.find((value) => value.cpf === cpf)) {
            return {
                success: false,
                message: 'Já existe uma conta criada com esse CPF.'
            };
        }

        const new_account = new Account(Date.now(), name, email, password, cpf, cep, 0, []);
        accounts.push(new_account);
        this.saveData('accounts', accounts);
        this.saveData('currentAccount', new_account.id);

        return {
            success: true,
            message: 'Conta criada com sucesso.'
        };
    }

    static enterAccount(email, password) {
        const accounts = this.getData('accounts') || [];
        const account = accounts.find((value) => value.email = email);

        if(!account) {
            return {
                success: false,
                message: 'Essa conta não existe.'
            };
        }

        if(account.password != password) {
            return {
                success: false,
                message: 'Credenciais incorretas.'
            };
        }

        this.saveData('currentAccount', account.id);

        return {
            success: true,
            message: 'Logado com sucesso.'
        };
    }
}