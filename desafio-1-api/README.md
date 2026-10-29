# Desafio 1 — Testes Automatizados de API

Testes de API com **Jest + Supertest** contra a API pública do
[ServeRest](https://serverest.dev/).

## Cenários

**Positivos (`tests/positive`)**
- Login e cadastro de usuários.
- Consulta, atualização, listagem e exclusão de usuários.
- Cadastro, consulta, atualização e exclusão de produtos.
- Criação de carrinho e conclusão da compra.

**Negativos (`tests/negative`)**
- Email duplicado, campos obrigatórios, JSON malformado e método não suportado.
- Login com senha incorreta e usuário inexistente.
- Identificador inválido.
- Produto sem token, token inválido, usuário não administrador e campos ausentes.
- Carrinho sem token, produto inexistente e carrinho duplicado.
- Segurança: token de outro usuário não conclui o carrinho.

Todos os testes validam **status code**, **corpo** e **headers JSON**. A validação de headers usa um helper compartilhado; o caso de JSON malformado é a exceção, pois a API não devolve o header de CORS nessa resposta.

## Estrutura

```
helpers/
  api-client.mjs      cliente HTTP, base URL e cabeçalho de autenticação
  auth.api.mjs        login
  users.api.mjs       endpoints de usuários
  products.api.mjs    endpoints de produtos
  carts.api.mjs       endpoints de carrinhos
  session.mjs         criação de usuário + login
tests/
  fixtures/           factories de dados únicos
  positive/           cenários de sucesso
  negative/           cenários de erro separados por recurso
results/              relatório HTML gerado pelo Jest
```

As chamadas de API ficam separadas das factories de dados. Os testes importam as duas camadas e
mantêm apenas a orquestração e as assertions.

## Como executar

```bash
npm ci
cp .env.example .env
npm test
```

O relatório HTML é gerado em `results/report.html`.

Resultado atual: **29 testes passando**.

## Variáveis

| Variável | Padrão |
|---|---|
| `API_BASE_URL` | `https://serverest.dev` |
