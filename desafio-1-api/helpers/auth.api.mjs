import { api } from './api-client.mjs';

export const login = (email, password) => api.post('/login').send({ email, password });
