import { expect } from '@playwright/test';

export class AutomationProductsPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async open() {
    await this.page.goto(`${this.baseURL}/products`, { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByText('All Products')).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.page.locator('.productinfo a.add-to-cart').first().click();
    await this.page.waitForTimeout(1000);
  }

  async openCart() {
    await this.page.goto(`${this.baseURL}/view_cart`, { waitUntil: 'domcontentloaded' });
    await expect(this.page.getByText('Shopping Cart')).toBeVisible();
    await expect(this.page.locator('.cart_description').first()).toBeVisible();
  }
}
