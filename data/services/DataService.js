import { Account } from "../models/Account.js";

export class DataService {
    static saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    static getData(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    static getCurrentAccount() {
        const currentId = this.getData('currentAccount');
        if (!currentId) return null;
        return this.getAccountByID(currentId);
    }

    static getAccountByID(id) {
        const data = this.getData('accounts') || [];
        const account_data = data.find((value) => value.id === id);

        if (!account_data) return null;

        const account = new Account(
            account_data.id, 
            account_data.name, 
            account_data.email, 
            account_data.password, 
            account_data.cpf, 
            account_data.cep, 
            account_data.balance, 
            account_data.transactions || []
        );

        return account;
    }
    
    static getAccountByEmail(email) {
        const data = this.getData('accounts') || [];
        const account_data = data.find((value) => value.email === email);

        if (!account_data) return null;

        const account = new Account(
            account_data.id, 
            account_data.name, 
            account_data.email, 
            account_data.password, 
            account_data.cpf, 
            account_data.cep, 
            account_data.balance, 
            account_data.transactions || []
        );

        return account;
    }

    static saveAccountData(account) {
        const data = this.getData('accounts') || [];
        const index = data.findIndex((value) => value.id === account.id);
        
        const dataToSave = account.toJSON ? account.toJSON() : account;

        if (index !== -1) {
             data[index] = dataToSave;
        } else {
             data.push(dataToSave);
        }
        
        this.saveData('accounts', data);
    }

    static createAccount(name, email, password, cpf, cep) {
        if(!name || !email || !password || !cpf || !cep) return { success: false, message: 'Preencha todos os campos.' };
        
        const accounts = this.getData('accounts') || [];
        if(accounts.find((value) => value.email === email)) return { success: false, message: 'Email já cadastrado.' };
        if(accounts.find((value) => value.cpf === cpf)) return { success: false, message: 'CPF já cadastrado.' };

        const new_account = new Account(Date.now(), name, email, password, cpf, cep, 0, []);
        accounts.push(new_account);
        
        this.saveData('accounts', accounts);
        this.saveData('currentAccount', new_account.id);
        return { success: true, message: 'Conta criada com sucesso.' };
    }

    static enterAccount(email, password) {
        const accounts = this.getData('accounts') || [];
        const account = accounts.find((value) => value.email === email); 

        if(!account) return { success: false, message: 'Conta não encontrada.' };
        if(account.password !== password) return { success: false, message: 'Senha incorreta.' };

        this.saveData('currentAccount', account.id);
        return { success: true, message: 'Logado com sucesso.' };
    }
}