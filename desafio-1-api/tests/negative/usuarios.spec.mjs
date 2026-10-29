import { expectJsonResponse } from '../../helpers/assertions.mjs';
import { api } from '../../helpers/api-client.mjs';
import { login } from '../../helpers/auth.api.mjs';
import { createSession } from '../../helpers/session.mjs';
import { createUser, deleteUser, getUser } from '../../helpers/users.api.mjs';
import { customerData, uniqueEmail } from '../fixtures/factories.mjs';

describe('Usuários — cenários negativos', () => {
  let customerSession;

  beforeAll(async () => {
    customerSession = await createSession(customerData({ nome: 'Cliente Negativo' }));
  });

  afterAll(async () => {
    await deleteUser(customerSession.id);
  });

  test('POST /usuarios recusa email já cadastrado', async () => {
    const response = await createUser({
      ...customerData(),
      email: customerSession.user.email,
    });

    expectJsonResponse(response, 400);
    expect(response.body.message).toBe('Este email já está sendo usado');
  });

  test('POST /usuarios valida campos obrigatórios', async () => {
    const response = await createUser({});

    expectJsonResponse(response, 400);
    expect(response.body).toMatchObject({
      nome: 'nome é obrigatório',
      email: 'email é obrigatório',
      password: 'password é obrigatório',
      administrador: 'administrador é obrigatório',
    });
  });

  test('POST /usuarios recusa JSON malformado', async () => {
    const response = await api
      .post('/usuarios')
      .set('Content-Type', 'application/json')
      .send('{invalid');

    expectJsonResponse(response, 400, { cors: false });
    expect(response.body.message).toMatch(/aspas/);
  });

  test('PATCH /usuarios recusa método não suportado', async () => {
    const response = await api.patch('/usuarios');

    expectJsonResponse(response, 405);
    expect(response.body.message).toMatch(/PATCH/);
  });

  test('POST /login recusa senha incorreta', async () => {
    const response = await login(customerSession.user.email, 'senha-incorreta');

    expectJsonResponse(response, 401);
    expect(response.body.message).toBe('Email e/ou senha inválidos');
  });

  test('POST /login recusa usuário inexistente', async () => {
    const response = await login(uniqueEmail('inexistente'), 'teste123');

    expectJsonResponse(response, 401);
    expect(response.body.message).toBe('Email e/ou senha inválidos');
  });

  test('GET /usuarios/:id recusa identificador inválido', async () => {
    const response = await getUser('id-invalido');

    expectJsonResponse(response, 400);
    expect(response.body.id).toBe('id deve ter exatamente 16 caracteres alfanuméricos');
  });
});
