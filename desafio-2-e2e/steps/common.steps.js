import { Given, When } from '@cucumber/cucumber';
import { AutomationLoginPage } from '../pages/AutomationLoginPage.js';

Given('que existe um cliente na Automation Exercise', async function () {
  await this.createAutomationUser();
});

When('faço login na Automation Exercise', async function () {
  this.automationLoginPage = new AutomationLoginPage(this.page, this.automationURL);
  await this.automationLoginPage.open();
  await this.automationLoginPage.login(this.automationUser.email, this.automationUser.password);
});
