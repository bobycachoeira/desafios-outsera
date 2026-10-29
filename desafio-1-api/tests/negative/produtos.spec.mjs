import { api } from '../../helpers/api-client.mjs';
import { createProduct } from '../../helpers/products.api.mjs';
import { createSession } from '../../helpers/session.mjs';
import { deleteUser } from '../../helpers/users.api.mjs';
import { adminData, customerData, productData } from '../fixtures/factories.mjs';

describe('Produtos — cenários negativos', () => {
  let adminSession;
  let customerSession;

  beforeAll(async () => {
    adminSession = await createSession(adminData({ nome: 'Admin Negativo' }));
    customerSession = await createSession(customerData({ nome: 'Cliente Negativo' }));
  });

  afterAll(async () => {
    await deleteUser(adminSession.id);
    await deleteUser(customerSession.id);
  });

  test('POST /produtos exige autenticação', async () => {
    const response = await api.post('/produtos').send(productData());

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Token de acesso/);
  });

  test('POST /produtos recusa token inválido', async () => {
    const response = await api
      .post('/produtos')
      .set({ Authorization: 'Bearer token-invalido' })
      .send(productData());

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch(/Token de acesso/);
  });

  test('POST /produtos exige perfil administrador', async () => {
    const response = await createProduct(customerSession.token, productData());

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Rota exclusiva para administradores');
  });

  test('POST /produtos valida campos obrigatórios', async () => {
    const response = await createProduct(adminSession.token, {});

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      nome: 'nome é obrigatório',
      preco: 'preco é obrigatório',
      descricao: 'descricao é obrigatório',
      quantidade: 'quantidade é obrigatório',
    });
  });
});
