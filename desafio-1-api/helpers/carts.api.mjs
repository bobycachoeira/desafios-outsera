import { api, auth } from './api-client.mjs';

export const createCart = (token, data) => api.post('/carrinhos').set(auth(token)).send(data);

export const getCart = (id) => api.get(`/carrinhos/${id}`);

export const listCarts = () => api.get('/carrinhos');

export const finishPurchase = (token) =>
  api.delete('/carrinhos/concluir-compra').set(auth(token));

export const cancelPurchase = (token) =>
  api.delete('/carrinhos/cancelar-compra').set(auth(token));
