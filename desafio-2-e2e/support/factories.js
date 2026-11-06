export const uniqueId = () =>
  `${Date.now()}.${Math.random().toString(16).slice(2, 8)}`;

export const userData = (overrides = {}) => ({
  name: 'Cliente Automation',
  email: `ae.${uniqueId()}@example.com`,
  password: `Senha.${uniqueId()}`,
  title: 'Mr',
  birth_date: '1',
  birth_month: '1',
  birth_year: '1990',
  firstname: 'Cliente',
  lastname: 'Automation',
  company: 'QA',
  address1: 'Rua Teste 1',
  address2: 'Apto 2',
  country: 'India',
  zipcode: '12345',
  state: 'SP',
  city: 'Sao Paulo',
  mobile_number: '11999999999',
  ...overrides,
});

export const paymentData = (overrides = {}) => ({
  name: 'AE User',
  cardNumber: '4111111111111111',
  cvc: '123',
  expiryMonth: '12',
  expiryYear: '2030',
  ...overrides,
});

export const contactData = (overrides = {}) => ({
  name: 'Cliente Automation',
  email: `contato.${uniqueId()}@example.com`,
  subject: 'Teste de validação',
  message: 'Mensagem de teste',
  ...overrides,
});
