# language: pt

Funcionalidade: Login na Automation Exercise
  Como cliente do e-commerce
  Quero autenticar no sistema
  Para acessar minha conta

  Esquema do Cenário: Login com cliente cadastrado
    Dado que existe um cliente na Automation Exercise
    Quando acesso a página de login da Automation Exercise
    E informo o email do cliente e a senha "<senha>"
    E clico em login
    Então devo ter o resultado "<resultado>"

    Exemplos:
      | senha            | resultado                                      |
      | SENHA_DO_CLIENTE | autenticado                                    |
      | senha-incorreta  | mensagem: Your email or password is incorrect! |
      |                  | senha inválida                                 |

  Esquema do Cenário: Login com email não cadastrado
    Quando acesso a página de login da Automation Exercise
    E informo um email não cadastrado e a senha "<senha>"
    E clico em login
    Então devo ter o resultado "<resultado>"

    Exemplos:
      | senha    | resultado                                      |
      | teste123 | mensagem: Your email or password is incorrect! |

  Esquema do Cenário: Login com dados inválidos
    Quando acesso a página de login da Automation Exercise
    E informo o email "<email>" e a senha "<senha>"
    E clico em login
    Então devo ter o resultado "<resultado>"

    Exemplos:
      | email          | senha    | resultado           |
      | email-invalido | teste123 | email inválido      |
      |                |          | permanecer no login |
