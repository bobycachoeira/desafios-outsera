import { api, auth } from './api-client.mjs';

export const createProduct = (token, data) => api.post('/produtos').set(auth(token)).send(data);

export const listProducts = () => api.get('/produtos');

export const getProduct = (id) => api.get(`/produtos/${id}`);

export const updateProduct = (token, id, data) =>
  api.put(`/produtos/${id}`).set(auth(token)).send(data);

export const deleteProduct = (id, token) => api.delete(`/produtos/${id}`).set(auth(token));
