# language: pt

Funcionalidade: Navegação para formulário
  Como cliente autenticado
  Quero navegar até o formulário de contato
  Para enviar uma mensagem

  Cenário: Acessar o formulário de contato
    Dado que existe um cliente na Automation Exercise
    Quando faço login na Automation Exercise
    E acesso o formulário de contato
    Então devo ver os campos do formulário de contato
