import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AutomationLoginPage } from '../pages/AutomationLoginPage.js';

const SENHA_DO_CLIENTE = 'SENHA_DO_CLIENTE';

When('acesso a página de login da Automation Exercise', async function () {
  this.automationLoginPage = new AutomationLoginPage(this.page, this.automationURL);
  await this.automationLoginPage.open();
});

When('informo o email e a senha do cliente', async function () {
  await this.automationLoginPage.fill(this.automationUser.email, this.automationUser.password);
});

When('informo o email do cliente e a senha {string}', async function (password) {
  const senha = password === SENHA_DO_CLIENTE ? this.automationUser.password : password;
  await this.automationLoginPage.fill(this.automationUser.email, senha);
});

When('informo um email não cadastrado e a senha {string}', async function (password) {
  await this.automationLoginPage.fill(`naoexiste.${Date.now()}@example.com`, password);
});

When('informo o email {string} e a senha {string}', async function (email, password) {
  await this.automationLoginPage.fill(email, password);
});

When('clico em login', async function () {
  await this.automationLoginPage.submit();
});

Then('devo ter o resultado {string}', async function (resultado) {
  const [tipo, ...rest] = resultado.split(':');
  const valor = rest.join(':').trim();

  switch (tipo.trim()) {
    case 'autenticado':
      return this.automationLoginPage.expectAuthenticated();
    case 'email inválido':
      return this.automationLoginPage.expectEmailInvalid();
    case 'senha inválida':
      return this.automationLoginPage.expectPasswordInvalid();
    case 'permanecer no login':
      return this.automationLoginPage.expectToStayOnLogin();
    case 'mensagem':
      return expect(this.page.getByText(valor, { exact: true })).toBeVisible();
    default:
      throw new Error(`Resultado não mapeado: ${resultado}`);
  }
});
