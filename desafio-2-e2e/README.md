# Desafio 2 — Testes End-to-End (E2E)

Testes E2E com **Cucumber + Playwright** no
[Automation Exercise](https://www.automationexercise.com/).

O site foi escolhido por ter o fluxo completo de login, carrinho, checkout, pagamento e
confirmação do pedido.

## Cenários

**Login (`features/login.feature`)**
- Esquema do Cenário “Login com cliente cadastrado”: válido, senha incorreta e senha em branco.
- Esquema do Cenário “Login com email não cadastrado”.
- Esquema do Cenário “Login com dados inválidos”: email em formato inválido e campos em branco.

Os casos que só variam a massa/resultado usam `Esquema do Cenário` + `Exemplos`, evitando repetir
o mesmo bloco em vários cenários. A senha válida vem da factory do usuário: nos `Exemplos`, o
token `SENHA_DO_CLIENTE` é resolvido em runtime pelo step.

**Navegação (`features/navegacao.feature`)**
- Login e acesso ao formulário de contato.
- Tentativa de enviar contato sem email.

**Checkout (`features/checkout.feature`)**
- `Contexto` centraliza a criação do cliente e o login.
- Esquema do Cenário “Finalizar compra”: dados válidos, sem número do cartão e sem dados.
- Tentativa de iniciar checkout com o carrinho vazio.

Resultado atual: **12 cenários / 69 steps** (os `Esquema do Cenário` expandem para os exemplos).

## Estrutura

```
features/         cenários em Gherkin (português)
steps/            implementação dos passos
pages/            Page Objects
support/          World, hooks e ciclo do navegador
  factories.js    factories de dados dinâmicos (usuário, pagamento, contato)
results/          relatórios HTML/JSON e screenshots dos cenários
```

As contas são criadas pela API do Automation Exercise antes de cada cenário e removidas no final.
Assim os testes não dependem de cadastros fixos.

## Dados dinâmicos

Os dados ficam fora dos Page Objects, em `support/factories.js`, com o mesmo padrão de `overrides`
usado nos testes de API:

```js
import { contactData, paymentData, userData } from '../support/factories.js';

userData();                          // email único por chamada
paymentData({ cardNumber: '' });     // variação pontual
contactData({ email: '' });          // formulário sem email

await checkoutPage.fillPayment(paymentData());
await checkoutPage.submitPayment();

await checkoutPage.fillPayment(paymentData({ cardNumber: '' }));
await checkoutPage.submitPayment();
```

Um dado criado para um teste pode ser reutilizado em outro importando a factory e passando
`overrides`, sem duplicar valores dentro da página e sem depender de constantes soltas.

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

  async fillPayment(payment) {
    await this.nameOnCard.fill(payment.name);
    await this.cardNumber.fill(payment.cardNumber);
    await this.cvc.fill(payment.cvc);
    await this.expiryMonth.fill(payment.expiryMonth);
    await this.expiryYear.fill(payment.expiryYear);
  }

  async submitPayment() {
    await this.payButton.click();
  }

  async expectConfirmation() {
    await expect(this.confirmation).toBeVisible({ timeout: 30000 });
  }

  async expectStillOnPaymentPage() {
    await expect(this.page).toHaveURL(/\/payment$/);
    expect(await this.cardNumber.evaluate((element) => element.checkValidity())).toBe(false);
  }
}
```

Regras adotadas:

- locators ficam no `constructor`, como fonte única;
- métodos expõem ações, não locators crus;
- o Page Object recebe os dados; a origem da massa fica em `support/factories.js`;
- getters ficam reservados para locators dinâmicos;
- não há JSON externo de elementos; os seletores acompanham o comportamento da página;
- se um bloco for reutilizado por várias páginas, ele vira um Component Object em
  `pages/components/`.

## Como executar

Requer Node.js 18+.

```bash
npm ci
npx playwright install chromium
cp .env.example .env
npm run test:e2e
```

### Compatibilidade com Windows

Os scripts npm usam `cross-env`, então `npm run test:e2e`, `npm run test:e2e:dev` e
`npm run test:e2e:qa` funcionam normalmente no **PowerShell** e no **cmd**.

O único ponto de atenção é o comando `cp` dos exemplos, que é de shell POSIX. No Windows, use o
equivalente:

```powershell
Copy-Item .env.example .env
Copy-Item .env.dev.example .env.dev
Copy-Item .env.qa.example .env.qa
```

Ou execute os passos pelo **Git Bash/WSL**. Alternativamente, pode pular a cópia do `.env`: a URL
padrão do Automation Exercise é usada quando `AUTOMATION_BASE_URL` não está definida.

## Ambientes

A URL é lida de `AUTOMATION_BASE_URL`. Para alternar entre ambientes, crie os arquivos a partir
dos exemplos e use os scripts correspondentes:

```bash
cp .env.dev.example .env.dev
cp .env.qa.example .env.qa
npm run test:e2e:dev
npm run test:e2e:qa
```

Cada script carrega o `.env` do ambiente via `DOTENV_CONFIG_PATH`, sem alterar o `.env` padrão.
A estrutura é a mesma para qualquer ambiente; só muda a `AUTOMATION_BASE_URL` (e, se necessário,
`HEADLESS`).

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
| `DOTENV_CONFIG_PATH` | `.env` (definido pelos scripts de ambiente) |
