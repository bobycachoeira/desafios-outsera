import { expectJsonResponse } from '../../helpers/assertions.mjs';
import { login } from '../../helpers/auth.api.mjs';
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '../../helpers/users.api.mjs';
import { adminData, customerData } from '../fixtures/factories.mjs';

describe('Usuários e login', () => {
  let admin;

  beforeAll(async () => {
    admin = adminData({ nome: 'Admin Usuarios' });
    const response = await createUser(admin);
    admin._id = response.body._id;
  });

  afterAll(async () => {
    await deleteUser(admin._id);
  });

  test('GET /usuarios retorna lista e headers JSON', async () => {
    const response = await listUsers();

    expectJsonResponse(response, 200);
    expect(response.body).toHaveProperty('quantidade');
    expect(Array.isArray(response.body.usuarios)).toBe(true);
  });

  test('POST /usuarios cadastra um novo usuário', async () => {
    const data = customerData();
    const response = await createUser(data);

    expectJsonResponse(response, 201);
    expect(response.body.message).toBe('Cadastro realizado com sucesso');
    expect(response.body._id).toEqual(expect.any(String));

    await deleteUser(response.body._id);
  });

  test('GET /usuarios/:id retorna o usuário cadastrado', async () => {
    const response = await getUser(admin._id);

    expectJsonResponse(response, 200);
    expect(response.body).toMatchObject({
      nome: admin.nome,
      email: admin.email,
      administrador: admin.administrador,
    });
  });

  test('PUT /usuarios/:id atualiza o usuário', async () => {
    const response = await updateUser(admin._id, {
      nome: 'Admin Atualizado',
      email: admin.email,
      password: admin.password,
      administrador: admin.administrador,
    });

    expectJsonResponse(response, 200);
    expect(response.body.message).toBe('Registro alterado com sucesso');

    const updated = await getUser(admin._id);
    expect(updated.body.nome).toBe('Admin Atualizado');
    admin.nome = 'Admin Atualizado';
  });

  test('DELETE /usuarios/:id remove o usuário', async () => {
    const data = customerData();
    const created = await createUser(data);

    const response = await deleteUser(created.body._id);

    expectJsonResponse(response, 200);
    expect(response.body.message).toBe('Registro excluído com sucesso');

    const removed = await getUser(created.body._id);
    expectJsonResponse(removed, 400);
  });

  test('POST /login retorna token de acesso', async () => {
    const response = await login(admin.email, admin.password);

    expectJsonResponse(response, 200);
    expect(response.body.message).toBe('Login realizado com sucesso');
    expect(response.body.authorization).toMatch(/^Bearer /);
  });
});
