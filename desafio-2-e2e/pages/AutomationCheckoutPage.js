import { expect } from '@playwright/test';

export class AutomationCheckoutPage {
  constructor(page) {
    this.page = page;
    this.cardNumber = page.locator('[data-qa="card-number"]');
  }

  async proceed() {
    await this.page.getByText('Proceed To Checkout').click();
    await expect(this.page).toHaveURL(/\/checkout$/);
  }

  async expectReview() {
    await expect(this.page.getByText('Review Your Order')).toBeVisible();
  }

  async placeOrder() {
    await this.page.getByText('Place Order').click();
    await expect(this.page).toHaveURL(/\/payment$/);
  }

  async payWithValidData() {
    await this.page.locator('[data-qa="name-on-card"]').fill('AE User');
    await this.cardNumber.fill('4111111111111111');
    await this.page.locator('[data-qa="cvc"]').fill('123');
    await this.page.locator('[data-qa="expiry-month"]').fill('12');
    await this.page.locator('[data-qa="expiry-year"]').fill('2030');
    await this.page.locator('[data-qa="pay-button"]').click();
    await expect(this.page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible({
      timeout: 30000,
    });
  }

  async tryToPayWithoutData() {
    await this.page.locator('[data-qa="pay-button"]').click();
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.cardNumber).toBeVisible();
    expect(await this.cardNumber.evaluate((element) => element.checkValidity())).toBe(false);
  }
}
