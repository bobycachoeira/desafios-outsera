import { expect } from '@playwright/test';

export class AutomationCheckoutPage {
  constructor(page) {
    this.page = page;
    this.proceedButton = page.getByText('Proceed To Checkout');
    this.reviewHeading = page.getByText('Review Your Order');
    this.placeOrderButton = page.getByText('Place Order');
    this.nameOnCard = page.locator('[data-qa="name-on-card"]');
    this.cardNumber = page.locator('[data-qa="card-number"]');
    this.cvc = page.locator('[data-qa="cvc"]');
    this.expiryMonth = page.locator('[data-qa="expiry-month"]');
    this.expiryYear = page.locator('[data-qa="expiry-year"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
    this.confirmation = page.getByText(
      'Congratulations! Your order has been confirmed!'
    );
  }

  async proceed() {
    await this.proceedButton.click();
    await expect(this.page).toHaveURL(/\/checkout$/);
  }

  async expectReview() {
    await expect(this.reviewHeading).toBeVisible();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
    await expect(this.page).toHaveURL(/\/payment$/);
  }

  async payWithValidData(data = {}) {
    const payment = {
      name: 'AE User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2030',
      ...data,
    };

    await this.nameOnCard.fill(payment.name);
    await this.cardNumber.fill(payment.cardNumber);
    await this.cvc.fill(payment.cvc);
    await this.expiryMonth.fill(payment.expiryMonth);
    await this.expiryYear.fill(payment.expiryYear);
    await this.payButton.click();

    await expect(this.confirmation).toBeVisible({ timeout: 30000 });
  }

  async tryToPayWithoutData() {
    await this.payButton.click();
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.cardNumber).toBeVisible();
    expect(await this.cardNumber.evaluate((element) => element.checkValidity())).toBe(false);
  }

  async payWithoutCardNumber() {
    await this.nameOnCard.fill('AE User');
    await this.cvc.fill('123');
    await this.expiryMonth.fill('12');
    await this.expiryYear.fill('2030');
    await this.payButton.click();

    await expect(this.page).toHaveURL(/\/payment$/);
    expect(await this.cardNumber.evaluate((element) => element.checkValidity())).toBe(false);
  }
}
