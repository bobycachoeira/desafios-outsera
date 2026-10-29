# language: pt

Funcionalidade: Login na Automation Exercise
  Como cliente do e-commerce
  Quero autenticar no sistema
  Para acessar minha conta

  Cenário: Login válido
    Dado que existe um cliente na Automation Exercise
    Quando acesso a página de login da Automation Exercise
    E informo o email e a senha do cliente
    E clico em login
    Então devo ver o usuário autenticado

  Cenário: Login com senha incorreta
    Dado que existe um cliente na Automation Exercise
    Quando acesso a página de login da Automation Exercise
    E informo o email do cliente e a senha "senha-incorreta"
    E clico em login
    Então devo ver a mensagem "Your email or password is incorrect!"

  Cenário: Login com usuário inexistente
    Quando acesso a página de login da Automation Exercise
    E informo um email não cadastrado e a senha "teste123"
    E clico em login
    Então devo ver a mensagem "Your email or password is incorrect!"

  Cenário: Login com campos em branco
    Quando acesso a página de login da Automation Exercise
    E clico em login
    Então devo permanecer na página de login da Automation Exercise
