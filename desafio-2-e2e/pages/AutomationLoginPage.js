import { expect } from '@playwright/test';

export class AutomationLoginPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
    this.email = page.locator('[data-qa="login-email"]');
    this.password = page.locator('[data-qa="login-password"]');
    this.submitButton = page.locator('[data-qa="login-button"]');
    this.loggedInMessage = page.getByText(/Logged in as/);
  }

  async open() {
    await this.page.goto(`${this.baseURL}/login`, { waitUntil: 'domcontentloaded' });
    await expect(this.email).toBeVisible();
  }

  async fill(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async login(email, password) {
    await this.fill(email, password);
    await this.submit();
    await this.expectAuthenticated();
  }

  async expectAuthenticated() {
    await expect(this.page).toHaveURL(`${this.baseURL}/`);
    await expect(this.loggedInMessage).toBeVisible({ timeout: 20000 });
  }

  async expectToStayOnLogin() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.email).toBeVisible();
  }

  async expectEmailInvalid() {
    await this.expectToStayOnLogin();
    expect(await this.email.evaluate((element) => element.checkValidity())).toBe(false);
  }

  async expectPasswordInvalid() {
    await this.expectToStayOnLogin();
    expect(await this.password.evaluate((element) => element.checkValidity())).toBe(false);
  }
}
