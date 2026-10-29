# Desafio 2 — Testes End-to-End (E2E)

Testes E2E com **Cucumber + Playwright** no
[Automation Exercise](https://www.automationexercise.com/).

O site foi escolhido por ter o fluxo completo de login, carrinho, checkout, pagamento e
confirmação do pedido.

## Cenários

**Login (`features/login.feature`)**
- Login válido.
- Login com senha incorreta.
- Login com usuário inexistente.
- Login com campos em branco.

**Navegação (`features/navegacao.feature`)**
- Login e acesso ao formulário de contato.

**Checkout (`features/checkout.feature`)**
- Compra completa: login, produto no carrinho, checkout, pagamento e confirmação.
- Compra sem dados de pagamento: valida que o pedido não é finalizado.

## Estrutura

```
features/         cenários em Gherkin (português)
steps/            implementação dos passos
pages/            Page Objects
support/          World, hooks e ciclo do navegador
results/          relatórios HTML/JSON e screenshots de falha
```

As contas são criadas pela API do Automation Exercise antes de cada cenário e removidas no final.
Assim os testes não dependem de cadastros fixos.

## Como executar

```bash
npm ci
npx playwright install chromium
cp .env.example .env
npm run test:e2e
```

Relatórios:
- `results/cucumber-report.html`
- `results/cucumber-report.json`
- `results/screenshots/` (somente em falhas)

## Variáveis

| Variável | Padrão |
|---|---|
| `AUTOMATION_BASE_URL` | `https://www.automationexercise.com` |
| `HEADLESS` | `true` |
