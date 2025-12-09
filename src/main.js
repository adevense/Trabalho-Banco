import { DataService } from "../data/services/DataService.js";
import { TransactionService } from "../data/services/TransactionService.js";

const authContainer = document.getElementById('auth-container');
const telaLogin = document.getElementById('tela-login');
const telaCadastro = document.getElementById('tela-cadastro');
const telaDashboard = document.getElementById('tela-dashboard');

function mostrarDashboard() {
    authContainer.style.display = 'none';
    telaDashboard.classList.remove('hidden');
    atualizarDashboard();
}

function mostrarLogin() {
    authContainer.style.display = 'flex';
    telaDashboard.classList.add('hidden');
    telaLogin.classList.remove('hidden');
    telaCadastro.classList.add('hidden');
}

function mostrarCadastro() {
    telaLogin.classList.add('hidden');
    telaCadastro.classList.remove('hidden');
}

function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor);
}

function atualizarDashboard() {
    const user = DataService.getCurrentAccount();
    if (!user) return mostrarLogin();

    document.getElementById('dash-nome').innerText = user.name.split(' ')[0];
    document.getElementById('dash-saldo').innerText = formatarMoeda(user.balance);

    const lista = document.getElementById('lista-extrato');
    lista.innerHTML = '';

    const transacoesRecentes = user.transactions.slice().reverse().slice(0, 10);

    if(transacoesRecentes.length === 0) {
        lista.innerHTML = '<div style="padding:20px; text-align:center; color:#888">Nenhuma atividade recente.</div>';
    }

    transacoesRecentes.forEach(t => {
        let icone = t.type === 'deposit' ? 'fa-circle-arrow-down' : 'fa-circle-arrow-up';
        
        let tipoClass;
        if (t.type === 'deposit') {
            tipoClass = 'entrada';
        } else if (t.type === 'withdraw') {
            tipoClass = 'saida';
        } else if (t.type === 'transfer') {
            tipoClass = 'transfer-saida';
        }

        // Se a transação falhou, usa a classe 'danger' (vermelho), caso contrário, usa a classe do tipo
        const finalClass = t.success ? tipoClass : 'danger';
        
        let tipo = t.type === 'deposit' ? 'Depósito' : 
                   t.type === 'withdraw' ? 'Saque' : 'Transferência';

        // O valor negativo na saída é tratado pelo CSS com 'saida'
        const valorExibido = Math.abs(t.value); 

        const div = document.createElement('div');
        div.className = 'trans-item';
        div.innerHTML = `
            <div class="user-info">
                <div class="icon-circle" style="width:35px; height:35px; font-size:14px; background-color: ${t.success ? 'var(--color-primary)' : 'var(--color-danger)'};">
                    <i class="fa-solid ${icone}"></i>
                </div>
                <div class="trans-info">
                    <strong>${tipo}</strong>
                    <small>${new Date(t.created_at).toLocaleDateString('pt-BR')}</small>
                </div>
            </div>
            <span class="trans-value ${finalClass}">
                R$ ${formatarMoeda(valorExibido)}
            </span>
        `;
        lista.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('btn-ir-cadastro').addEventListener('click', mostrarCadastro);
    document.getElementById('btn-voltar-login').addEventListener('click', mostrarLogin);

    document.getElementById('btn-entrar').addEventListener('click', () => {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-pass').value.trim();
        const res = DataService.enterAccount(email, pass);
        if(res.success) mostrarDashboard();
        else alert(res.message);
    });

    document.getElementById('btn-cadastrar').addEventListener('click', () => {
        const nome = document.getElementById('cad-nome').value.trim();
        const email = document.getElementById('cad-email').value.trim();
        const pass = document.getElementById('cad-pass').value.trim();
        const cpf = document.getElementById('cad-cpf').value.trim();
        const cep = document.getElementById('cad-cep').value.trim();

        const res = DataService.createAccount(nome, email, pass, cpf, cep);
        alert(res.message);
        if(res.success) mostrarDashboard();
    });

    document.getElementById('btn-sair').addEventListener('click', () => {
        localStorage.removeItem('currentAccount');
        mostrarLogin();
    });

    document.getElementById('btn-depositar').addEventListener('click', () => {
        const val = document.getElementById('valor-deposito').value;
        const user = DataService.getCurrentAccount();
        const res = TransactionService.makeDeposit(val, user);
        
        if (res.success) {
            document.getElementById('modal-deposito').close();
            document.getElementById('valor-deposito').value = ''; 
            atualizarDashboard();
        } else {
            alert(res.message);
        }
    });

    document.getElementById('btn-sacar').addEventListener('click', () => {
        const val = document.getElementById('valor-saque').value;
        const user = DataService.getCurrentAccount();
        const res = TransactionService.makeWithdraw(val, user);
        
        if (res.success) {
            document.getElementById('modal-saque').close();
            document.getElementById('valor-saque').value = '';
            atualizarDashboard();
        } else {
            alert(res.message);
        }
    });

    document.getElementById('btn-transferir').addEventListener('click', () => {
        const emailDestino = document.getElementById('transfer-email-destino').value.trim();
        const val = document.getElementById('valor-transferencia').value;
        
        const sender = DataService.getCurrentAccount();
        if (!sender) {
            alert("Erro: Usuário remetente não logado.");
            return;
        }
        
        const receiver = DataService.getAccountByEmail(emailDestino);
        
        if (!receiver) {
            alert("Erro: Destinatário não encontrado ou e-mail inválido.");
            return;
        }
        
        if (receiver.id === sender.id) {
            alert("Erro: Você não pode transferir para a sua própria conta.");
            return;
        }

        const res = TransactionService.makeTransfer(val, sender, receiver);
        
        if (res.success) {
            document.getElementById('modal-transferencia').close();
            document.getElementById('transfer-email-destino').value = '';
            document.getElementById('valor-transferencia').value = '';
            atualizarDashboard();
        } else {
            alert(res.message);
        }
    });

    if(DataService.getCurrentAccount()) mostrarDashboard();
});