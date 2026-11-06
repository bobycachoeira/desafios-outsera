# language: pt

Funcionalidade: Checkout em e-commerce de exemplo
  Como cliente autenticado
  Quero finalizar a compra de um produto
  Para validar o fluxo de checkout

  Contexto:
    Dado que existe um cliente na Automation Exercise
    Quando faço login na Automation Exercise

  Esquema do Cenário: Finalizar compra
    Quando adiciono um produto ao carrinho
    E inicio o checkout
    Então devo ver o resumo do pedido
    Quando clico em place order
    E preencho os dados de pagamento "<dados>"
    E confirmo o pagamento
    Então devo ter o resultado do pagamento "<resultado>"

    Exemplos:
      | dados                  | resultado               |
      | válidos                | confirmação do pedido   |
      | sem o número do cartão | permanecer no pagamento |
      | vazios                 | permanecer no pagamento |

  Cenário: Não iniciar checkout com carrinho vazio
    Quando acesso o carrinho vazio
    Então devo ver o carrinho vazio
    E não devo ver a opção de checkout
