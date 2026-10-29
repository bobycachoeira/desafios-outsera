import { expect } from '@playwright/test';

export class AutomationContactPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async open() {
    await this.page.goto(`${this.baseURL}/contact_us`, { waitUntil: 'domcontentloaded' });
  }

  async expectForm() {
    await expect(this.page.getByText('GET IN TOUCH')).toBeVisible();
    await expect(this.page.locator('[data-qa="name"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="email"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="subject"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="message"]')).toBeVisible();
    await expect(this.page.locator('[data-qa="submit-button"]')).toBeVisible();
  }
}
