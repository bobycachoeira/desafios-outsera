import { expect } from '@playwright/test';

export class AutomationProductsPage {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
    this.heading = page.getByText('All Products');
    this.addToCartButtons = page.locator('.productinfo a.add-to-cart');
    this.cartHeading = page.getByText('Shopping Cart');
    this.cartItems = page.locator('.cart_description');
  }

  async open() {
    await this.page.goto(`${this.baseURL}/products`, { waitUntil: 'domcontentloaded' });
    await expect(this.heading).toBeVisible();
  }

  async addFirstProductToCart() {
    await this.addToCartButtons.first().click();
    await this.page.waitForTimeout(1000);
  }

  async openCartPage() {
    await this.page.goto(`${this.baseURL}/view_cart`, { waitUntil: 'domcontentloaded' });
    await expect(this.cartHeading).toBeVisible();
  }

  async openCart() {
    await this.openCartPage();
    await expect(this.cartItems.first()).toBeVisible();
  }

  async expectEmptyCart() {
    await expect(this.page.getByText('Cart is empty!')).toBeVisible();
  }

  async expectCheckoutUnavailable() {
    await expect(this.page.getByText('Proceed To Checkout')).toHaveCount(0);
  }
}
