import {
  createProduct,
  deleteProduct,
  getProduct,
  listProducts,
  updateProduct,
} from '../../helpers/products.api.mjs';
import { createSession } from '../../helpers/session.mjs';
import { deleteUser } from '../../helpers/users.api.mjs';
import { adminData, productData } from '../fixtures/factories.mjs';

describe('Produtos', () => {
  let session;
  const createdIds = [];

  beforeAll(async () => {
    session = await createSession(adminData({ nome: 'Admin Produtos' }));
  });

  afterAll(async () => {
    for (const id of createdIds) {
      await deleteProduct(id, session.token);
    }
    await deleteUser(session.id);
  });

  async function createNewProduct(overrides = {}) {
    const data = productData(overrides);
    const response = await createProduct(session.token, data);

    expect(response.status).toBe(201);
    createdIds.push(response.body._id);

    return { data, id: response.body._id };
  }

  test('POST /produtos cadastra um produto autenticado', async () => {
    const response = await createProduct(session.token, productData());
    createdIds.push(response.body._id);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Cadastro realizado com sucesso');
  });

  test('GET /produtos retorna a lista de produtos', async () => {
    const response = await listProducts();

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('quantidade');
    expect(Array.isArray(response.body.produtos)).toBe(true);
  });

  test('GET /produtos/:id retorna o produto cadastrado', async () => {
    const product = await createNewProduct();
    const response = await getProduct(product.id);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      nome: product.data.nome,
      preco: product.data.preco,
    });
  });

  test('PUT /produtos/:id atualiza o produto', async () => {
    const product = await createNewProduct();
    const response = await updateProduct(session.token, product.id, {
      ...product.data,
      nome: 'Produto Atualizado',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Registro alterado com sucesso');

    const updated = await getProduct(product.id);
    expect(updated.body.nome).toBe('Produto Atualizado');
  });

  test('DELETE /produtos/:id remove o produto', async () => {
    const product = await createNewProduct();
    const response = await deleteProduct(product.id, session.token);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Registro excluído com sucesso');

    const removed = await getProduct(product.id);
    expect(removed.status).toBe(400);
  });
});
