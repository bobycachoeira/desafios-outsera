# language: pt

Funcionalidade: Checkout em e-commerce de exemplo
  Como cliente autenticado
  Quero finalizar a compra de um produto
  Para validar o fluxo de checkout

  Cenário: Finalizar compra com dados de pagamento válidos
    Dado que existe um cliente na Automation Exercise
    Quando faço login na Automation Exercise
    E adiciono um produto ao carrinho
    E inicio o checkout
    Então devo ver o resumo do pedido
    Quando clico em place order
    E preencho os dados de pagamento e confirmo o pedido
    Então devo ver a confirmação do pedido

  Cenário: Não finalizar compra sem dados de pagamento
    Dado que existe um cliente na Automation Exercise
    Quando faço login na Automation Exercise
    E adiciono um produto ao carrinho
    E inicio o checkout
    Então devo ver o resumo do pedido
    Quando clico em place order
    E tento confirmar o pedido sem preencher os dados de pagamento
    Então devo permanecer na página de pagamento
