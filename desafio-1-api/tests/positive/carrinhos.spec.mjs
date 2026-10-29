import { expectJsonResponse } from '../../helpers/assertions.mjs';
import { createCart, finishPurchase, getCart, listCarts } from '../../helpers/carts.api.mjs';
import { createProduct, deleteProduct } from '../../helpers/products.api.mjs';
import { createSession } from '../../helpers/session.mjs';
import { deleteUser } from '../../helpers/users.api.mjs';
import { adminData, customerData, productData } from '../fixtures/factories.mjs';

describe('Carrinhos', () => {
  let adminSession;
  let customerSession;
  let product;

  beforeAll(async () => {
    adminSession = await createSession(adminData({ nome: 'Admin Carrinho' }));
    customerSession = await createSession(customerData({ nome: 'Cliente Carrinho' }));

    const response = await createProduct(adminSession.token, productData());
    product = { id: response.body._id };
  });

  afterAll(async () => {
    await deleteProduct(product.id, adminSession.token);
    await deleteUser(adminSession.id);
    await deleteUser(customerSession.id);
  });

  test('POST /carrinhos cria carrinho e DELETE conclui a compra', async () => {
    const created = await createCart(customerSession.token, {
      produtos: [{ idProduto: product.id, quantidade: 1 }],
    });

    expectJsonResponse(created, 201);
    expect(created.body.message).toBe('Cadastro realizado com sucesso');

    const found = await getCart(created.body._id);
    expectJsonResponse(found, 200);
    expect(found.body.produtos[0].idProduto).toBe(product.id);

    const finished = await finishPurchase(customerSession.token);

    expectJsonResponse(finished, 200);
    expect(finished.body.message).toBe('Registro excluído com sucesso');
  });

  test('GET /carrinhos retorna a lista de carrinhos', async () => {
    const response = await listCarts();

    expectJsonResponse(response, 200);
    expect(response.body).toHaveProperty('quantidade');
    expect(Array.isArray(response.body.carrinhos)).toBe(true);
  });
});
