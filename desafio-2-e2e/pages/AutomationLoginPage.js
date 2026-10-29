import { expect } from '@playwright/test';

export class AutomationLoginPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async open() {
    await this.page.goto(`${this.baseURL}/login`, { waitUntil: 'domcontentloaded' });
    await expect(this.page.locator('[data-qa="login-email"]')).toBeVisible();
  }

  async fill(email, password) {
    await this.page.locator('[data-qa="login-email"]').fill(email);
    await this.page.locator('[data-qa="login-password"]').fill(password);
  }

  async submit() {
    await this.page.locator('[data-qa="login-button"]').click();
  }

  async login(email, password) {
    await this.fill(email, password);
    await this.submit();
    await this.expectAuthenticated();
  }

  async expectAuthenticated() {
    await expect(this.page).toHaveURL(`${this.baseURL}/`);
    await expect(this.page.getByText(/Logged in as/)).toBeVisible({ timeout: 20000 });
  }

  async expectToStayOnLogin() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.page.locator('[data-qa="login-email"]')).toBeVisible();
  }
}
