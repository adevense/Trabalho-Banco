<h1>Sistema bancário.</h1>

Funcionalidades do back-end:
<ul>
    <li>Criar uma conta;</li>
    <li>Entrar em uma conta;</li>
    <li>Realizar três tipos de transações: depósito, saque, transferência;</li>
</ul>

<h2>Detalhamento dos serviços:</h2>
Models: São os modelos (classes) de todas as instâncias/entidades do site.
<ul>
    <li>Account</li>
    <li>Transaction (classe base que não possui implementação e não deve ser instanciada)</li>
    <li>Deposit (herda de Transaction)</li>
    <li>Withdraw (herda de Transaction)</li>
    <li>Transfer (herda de Transaction)</li>
</ul>

Todas as classes (exceto Transaction) possuem os métodos: toJSON() que retorna um JSON que representa a classe e uma função estática getFromJSON(json) que recebe um JSON da classe correspondente e retorna uma instância da classe que possui os atributos desse JSON. Exemplos: <br>

let conta = getCurrentAccount(); // retorna uma instância da classe Account do usuário logado.<br>

contaJSON = conta.toJSON(); // retorna um JSON que representa essa instância de Account;<br>

let contaRecuperadaViaJSON = Account.getFromJSON(contaJSON); // recupera a instância da mesma conta utilizando a representação JSON dela.<br>

<h2>DataService.js - gerencia os dados do site.</h2>
        - saveData(key, data) e getData(key): salva e retorna dados do localStorage.<br>
        - getCurrentAccount() retorna a instância do usuário logado. <br>
        - getAccountByID(id) retorna a instância do usuário com o id. <br>
        - saveAccountData(account) recebe uma instância de uma conta como parâmetro e salva os dados dessa conta no localStorage.<br>
        - createAccount(name, email, password, cpf, cep) cria uma conta com as informações passadas por parâmetro. Retorna um JSON com a estrutura: { success: true/false, message: '' } que indica se a conta foi criada com sucesso ou não e a mensagem de erro/sucesso. Se a conta for criada com sucesso o usuário já é logado automaticamente (pode ser recuperado pela função getCurrentAccount()).<br>
        - enterAccount(email, password) entra na conta com as informações passadas por parâmetro. Retorna um JSON com a estrutura: { success: true/false, message: '' } que indica se a operação foi concluida com sucesso e sua mensagem.

<h2>TransactionService.js - gerencia as transações.</h2>
        - OBS: todo JSON de transação possui as propriedades: created_at (data da transação), success (true/false e indica se a transação foi completada com sucesso), error_message (mensagem de erro caso algum erro tenha acontecido na transação).<br><br>
        - makeDeposit(value, account) realiza um depósito na conta passada com o valor de value e adiciona o depósito no histórico de transações da conta. Retorna um JSON que representa o depósito.<br>
        - makeWithdraw(value, account) realiza um saque na conta passada com o valor de value e adiciona o saque no histórico de transações da conta. Retorna um JSON que representa o saque.<br>
        - makeTransfer(value, sender, receiver) realiza uma transferência no valor de value da conta sender para a conta receiver e adiciona a transferência no histório de transações da conta sender. Retorna um JSON que representa a transferência.

<h2>UtilsServices.js - classe para colocar funções utilitárias (vazia por enquanto). Recomendação: implementar uma função que válida CEP e outra que válida o CPF.</h2>
