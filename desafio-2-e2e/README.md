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
- Login com email em formato inválido.
- Login com senha em branco.

**Navegação (`features/navegacao.feature`)**
- Login e acesso ao formulário de contato.
- Tentativa de enviar contato sem email.

**Checkout (`features/checkout.feature`)**
- Compra completa: login, produto no carrinho, checkout, pagamento e confirmação.
- Compra sem dados de pagamento.
- Compra sem número do cartão, com os demais campos preenchidos.
- Tentativa de iniciar checkout com o carrinho vazio.

Resultado atual: **12 cenários / 65 steps**.

## Estrutura

```
features/         cenários em Gherkin (português)
steps/            implementação dos passos
pages/            Page Objects
support/          World, hooks e ciclo do navegador
results/          relatórios HTML/JSON e screenshots dos cenários
```

As contas são criadas pela API do Automation Exercise antes de cada cenário e removidas no final.
Assim os testes não dependem de cadastros fixos.

## Page Objects e locators

Cada página tem uma classe em `pages/` com todos os locators centralizados no `constructor`:

```js
export class AutomationCheckoutPage {
  constructor(page) {
    this.page = page;
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.confirmation = page.getByText(
      'Congratulations! Your order has been confirmed!'
    );
  }

  async payWithValidData(data = {}) {
    const payment = {
      name: 'AE User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
      ...data,
    };

    await this.nameOnCard.fill(payment.name);
    await this.cardNumber.fill(payment.cardNumber);
    await this.cvc.fill(payment.cvc);
    await this.expiryMonth.fill(payment.expiryMonth);
    await this.expiryYear.fill(payment.expiryYear);
    await this.payButton.click();

    await expect(this.confirmation).toBeVisible({ timeout: 30000 });
  }
}
```

Regras adotadas:

- locators ficam no `constructor`, como fonte única;
- métodos expõem ações, não locators crus;
- dados são parametrizáveis com defaults, permitindo variações sem duplicar código;
- getters ficam reservados para locators dinâmicos;
- não há JSON externo de elementos; os seletores acompanham o comportamento da página;
- se um bloco for reutilizado por várias páginas, ele vira um Component Object em
  `pages/components/`.

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
- `results/screenshots/` (um screenshot por cenário)

Neste desafio, o screenshot é capturado e anexado ao relatório em **todos os cenários**, inclusive
nos que passam, para servir de evidência visual. Em um projeto de produção, a recomendação é
capturar apenas em falhas ou em passos críticos, evitando volume desnecessário de artefatos.

## Variáveis

| Variável | Padrão |
|---|---|
| `AUTOMATION_BASE_URL` | `https://www.automationexercise.com` |
| `HEADLESS` | `true` |
