import { Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AutomationLoginPage } from '../pages/AutomationLoginPage.js';

When('acesso a página de login da Automation Exercise', async function () {
  this.automationLoginPage = new AutomationLoginPage(this.page, this.automationURL);
  await this.automationLoginPage.open();
});

When('informo o email e a senha do cliente', async function () {
  await this.automationLoginPage.fill(this.automationUser.email, this.automationUser.password);
});

When('informo o email do cliente e a senha {string}', async function (password) {
  await this.automationLoginPage.fill(this.automationUser.email, password);
});

When('informo um email não cadastrado e a senha {string}', async function (password) {
  await this.automationLoginPage.fill(`naoexiste.${Date.now()}@example.com`, password);
});

When('informo o email {string} e a senha {string}', async function (email, password) {
  await this.automationLoginPage.fill(email, password);
});

When('informo o email do cliente e deixo a senha em branco', async function () {
  await this.automationLoginPage.fill(this.automationUser.email, '');
});

When('clico em login', async function () {
  await this.automationLoginPage.submit();
});

Then('devo ver o usuário autenticado', async function () {
  await this.automationLoginPage.expectAuthenticated();
});

Then('devo ver a mensagem {string}', async function (message) {
  await expect(this.page.getByText(message, { exact: true })).toBeVisible();
});

Then('devo permanecer na página de login da Automation Exercise', async function () {
  await this.automationLoginPage.expectToStayOnLogin();
});

Then('devo permanecer na página de login com o email inválido', async function () {
  await this.automationLoginPage.expectEmailInvalid();
});

Then('devo permanecer na página de login com a senha inválida', async function () {
  await this.automationLoginPage.expectPasswordInvalid();
});
