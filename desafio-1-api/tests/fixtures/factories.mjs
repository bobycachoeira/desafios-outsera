export const uniqueEmail = (prefix = 'qa') =>
  `${prefix}.${Date.now()}.${Math.random().toString(16).slice(2, 8)}@example.com`;

export const adminData = (overrides = {}) => ({
  nome: 'Admin QA',
  email: uniqueEmail('admin'),
  password: 'teste123',
  administrador: 'true',
  ...overrides,
});

export const customerData = (overrides = {}) => ({
  nome: 'Cliente QA',
  email: uniqueEmail('cliente'),
  password: 'teste123',
  administrador: 'false',
  ...overrides,
});

export const productData = (overrides = {}) => ({
  nome: `Produto QA ${Date.now()}`,
  preco: 100,
  descricao: 'Produto criado pelos testes automatizados',
  quantidade: 10,
  ...overrides,
});
