import { Then, When } from '@cucumber/cucumber';
import { AutomationContactPage } from '../pages/AutomationContactPage.js';

When('acesso o formulário de contato', async function () {
  this.automationContactPage = new AutomationContactPage(this.page, this.automationURL);
  await this.automationContactPage.open();
});

Then('devo ver os campos do formulário de contato', async function () {
  await this.automationContactPage.expectForm();
});
