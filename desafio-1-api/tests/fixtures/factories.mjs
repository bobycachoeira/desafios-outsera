export const uniqueId = () =>
  `${Date.now()}.${Math.random().toString(16).slice(2, 8)}`;

export const uniqueEmail = (prefix = 'qa') => `${prefix}.${uniqueId()}@example.com`;

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
  nome: `Produto QA ${uniqueId()}`,
  preco: 100,
  descricao: 'Produto criado pelos testes automatizados',
  quantidade: 10,
  ...overrides,
});

export const requiredUserFields = [
  { field: 'nome', message: 'nome é obrigatório' },
  { field: 'email', message: 'email é obrigatório' },
  { field: 'password', message: 'password é obrigatório' },
  { field: 'administrador', message: 'administrador é obrigatório' },
];
