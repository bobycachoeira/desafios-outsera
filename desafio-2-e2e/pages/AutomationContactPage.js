import { expect } from '@playwright/test';

export class AutomationContactPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
    this.heading = page.getByText('GET IN TOUCH');
    this.name = page.locator('[data-qa="name"]');
    this.email = page.locator('[data-qa="email"]');
    this.subject = page.locator('[data-qa="subject"]');
    this.message = page.locator('[data-qa="message"]');
    this.submitButton = page.locator('[data-qa="submit-button"]');
  }

  async open() {
    await this.page.goto(`${this.baseURL}/contact_us`, { waitUntil: 'domcontentloaded' });
  }

  async expectForm() {
    await expect(this.heading).toBeVisible();
    await expect(this.name).toBeVisible();
    await expect(this.email).toBeVisible();
    await expect(this.subject).toBeVisible();
    await expect(this.message).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillFormWithoutEmail() {
    await this.name.fill('Cliente Automation');
    await this.subject.fill('Teste de validação');
    await this.message.fill('Mensagem de teste');
  }

  async submit() {
    await this.submitButton.click();
  }

  async expectEmailInvalid() {
    await expect(this.page).toHaveURL(/\/contact_us$/);
    expect(await this.email.evaluate((element) => element.checkValidity())).toBe(false);
  }
}
