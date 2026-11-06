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

## Massas dinâmicas

As factories geram dados únicos por execução e aceitam `overrides`, permitindo variações sem
duplicar payloads:

```js
import { customerData, productData } from '../fixtures/factories.mjs';

customerData();                                  // email único a cada chamada
customerData({ administrador: 'true' });         // sobrescreve campos
productData({ preco: 50, quantidade: 1 });       // massa específica do teste
```

Casos tabulares usam `test.each`, como na validação dos campos obrigatórios de usuário:

```js
import { customerData, requiredUserFields } from '../fixtures/factories.mjs';

test.each(requiredUserFields)('POST /usuarios exige o campo $field', async ({ field, message }) => {
  const payload = customerData();
  delete payload[field];

  const response = await createUser(payload);

  expectJsonResponse(response, 400);
  expect(response.body[field]).toBe(message);
});
```

Cada linha do array vira um teste independente, com a massa e a mensagem esperada definidas no
próprio caso.

## Como executar

Requer Node.js 18+. Os scripts usam `cross-env`, então funcionam em Windows, Linux e macOS.

```bash
npm ci
cp .env.example .env
npm test
```

O relatório HTML é gerado em `results/report.html`.

Resultado atual: **33 testes passando**.

## Ambientes

A URL é lida de `API_BASE_URL`. Para alternar entre ambientes, crie os arquivos a partir dos
exemplos e use os scripts correspondentes:

```bash
cp .env.dev.example .env.dev
cp .env.qa.example .env.qa
npm run test:dev
npm run test:qa
```

Cada script carrega o `.env` do ambiente via `DOTENV_CONFIG_PATH`, sem alterar o `.env` padrão.
A estrutura é a mesma para qualquer ambiente; só muda a `API_BASE_URL`.

## Variáveis

| Variável | Padrão |
|---|---|
| `API_BASE_URL` | `https://serverest.dev` |
| `DOTENV_CONFIG_PATH` | `.env` (definido pelos scripts de ambiente) |
