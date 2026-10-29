import { Then, When } from '@cucumber/cucumber';
import { AutomationCheckoutPage } from '../pages/AutomationCheckoutPage.js';
import { AutomationProductsPage } from '../pages/AutomationProductsPage.js';

When('adiciono um produto ao carrinho', async function () {
  this.automationProductsPage = new AutomationProductsPage(this.page, this.automationURL);
  await this.automationProductsPage.open();
  await this.automationProductsPage.addFirstProductToCart();
});

When('inicio o checkout', async function () {
  await this.automationProductsPage.openCart();
  this.automationCheckoutPage = new AutomationCheckoutPage(this.page);
  await this.automationCheckoutPage.proceed();
});

Then('devo ver o resumo do pedido', async function () {
  await this.automationCheckoutPage.expectReview();
});

When('clico em place order', async function () {
  await this.automationCheckoutPage.placeOrder();
});

When('preencho os dados de pagamento e confirmo o pedido', async function () {
  await this.automationCheckoutPage.payWithValidData();
});

Then('devo ver a confirmação do pedido', async function () {
  await this.page.getByText('Congratulations! Your order has been confirmed!').waitFor();
});

When('tento confirmar o pedido sem preencher os dados de pagamento', async function () {
  await this.automationCheckoutPage.tryToPayWithoutData();
});

Then('devo permanecer na página de pagamento', async function () {
  await this.page.waitForURL(/\/payment$/);
});
