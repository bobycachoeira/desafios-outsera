import { expectJsonResponse } from '../../helpers/assertions.mjs';
import { api } from '../../helpers/api-client.mjs';
import {
  cancelPurchase,
  createCart,
  finishPurchase,
  getCart,
} from '../../helpers/carts.api.mjs';
import { createProduct, deleteProduct } from '../../helpers/products.api.mjs';
import { createSession } from '../../helpers/session.mjs';
import { deleteUser } from '../../helpers/users.api.mjs';
import { adminData, customerData, productData } from '../fixtures/factories.mjs';

describe('Carrinhos — cenários negativos', () => {
  let adminSession;
  let customerSession;
  let otherCustomerSession;
  let product;

  beforeAll(async () => {
    adminSession = await createSession(adminData({ nome: 'Admin Carrinho' }));
    customerSession = await createSession(customerData({ nome: 'Cliente A' }));
    otherCustomerSession = await createSession(customerData({ nome: 'Cliente B' }));

    const response = await createProduct(adminSession.token, productData());
    product = { id: response.body._id };
  });

  afterAll(async () => {
    await cancelPurchase(customerSession.token);
    await cancelPurchase(otherCustomerSession.token);
    await deleteProduct(product.id, adminSession.token);
    await deleteUser(adminSession.id);
    await deleteUser(customerSession.id);
    await deleteUser(otherCustomerSession.id);
  });

  test('POST /carrinhos recusa produto inexistente', async () => {
    const response = await createCart(customerSession.token, {
      produtos: [{ idProduto: 'aaaaaaaaaaaaaaaa', quantidade: 1 }],
    });

    expectJsonResponse(response, 400);
    expect(response.body.message).toBe('Produto não encontrado');
  });

  test('POST /carrinhos recusa segundo carrinho para o mesmo usuário', async () => {
    await createCart(customerSession.token, {
      produtos: [{ idProduto: product.id, quantidade: 1 }],
    });

    const response = await createCart(customerSession.token, {
      produtos: [{ idProduto: product.id, quantidade: 1 }],
    });

    expectJsonResponse(response, 400);
    expect(response.body.message).toBe('Não é permitido ter mais de 1 carrinho');

    await finishPurchase(customerSession.token);
  });

  test('POST /carrinhos exige autenticação', async () => {
    const response = await api
      .post('/carrinhos')
      .send({ produtos: [{ idProduto: product.id, quantidade: 1 }] });

    expectJsonResponse(response, 401);
    expect(response.body.message).toMatch(/Token de acesso/);
  });

  test('DELETE /carrinhos/concluir-compra exige autenticação', async () => {
    const response = await api.delete('/carrinhos/concluir-compra');

    expectJsonResponse(response, 401);
    expect(response.body.message).toMatch(/Token de acesso/);
  });

  test('não permite concluir o carrinho de outro usuário', async () => {
    const created = await createCart(customerSession.token, {
      produtos: [{ idProduto: product.id, quantidade: 1 }],
    });

    const attempt = await finishPurchase(otherCustomerSession.token);

    expectJsonResponse(attempt, 200);
    expect(attempt.body.message).toBe('Não foi encontrado carrinho para esse usuário');

    const current = await getCart(created.body._id);
    expectJsonResponse(current, 200);
    expect(current.body._id).toBe(created.body._id);

    await finishPurchase(customerSession.token);
  });
});
