import { api } from './api-client.mjs';

export const createUser = (data) => api.post('/usuarios').send(data);

export const getUser = (id) => api.get(`/usuarios/${id}`);

export const updateUser = (id, data) => api.put(`/usuarios/${id}`).send(data);

export const deleteUser = (id) => api.delete(`/usuarios/${id}`);

export const listUsers = () => api.get('/usuarios');
