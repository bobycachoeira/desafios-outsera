import { Then, When } from '@cucumber/cucumber';
import { AutomationCheckoutPage } from '../pages/AutomationCheckoutPage.js';
import { AutomationProductsPage } from '../pages/AutomationProductsPage.js';
import { paymentData } from '../support/factories.js';

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

When('preencho os dados de pagamento {string}', async function (tipo) {
  switch (tipo) {
    case 'válidos':
      return this.automationCheckoutPage.fillPayment(paymentData());
    case 'sem o número do cartão':
      return this.automationCheckoutPage.fillPayment(paymentData({ cardNumber: '' }));
    case 'vazios':
      return;
    default:
      throw new Error(`Dados de pagamento não mapeados: ${tipo}`);
  }
});

When('confirmo o pagamento', async function () {
  await this.automationCheckoutPage.submitPayment();
});

Then('devo ter o resultado do pagamento {string}', async function (resultado) {
  switch (resultado) {
    case 'confirmação do pedido':
      return this.automationCheckoutPage.expectConfirmation();
    case 'permanecer no pagamento':
      return this.automationCheckoutPage.expectStillOnPaymentPage();
    default:
      throw new Error(`Resultado de pagamento não mapeado: ${resultado}`);
  }
});

When('acesso o carrinho vazio', async function () {
  this.automationProductsPage = new AutomationProductsPage(this.page, this.automationURL);
  await this.automationProductsPage.openCartPage();
});

Then('devo ver o carrinho vazio', async function () {
  await this.automationProductsPage.expectEmptyCart();
});

Then('não devo ver a opção de checkout', async function () {
  await this.automationProductsPage.expectCheckoutUnavailable();
});
