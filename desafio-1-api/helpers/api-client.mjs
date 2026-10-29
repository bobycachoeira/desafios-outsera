import request from 'supertest';

export const API_BASE_URL = (process.env.API_BASE_URL || 'https://serverest.dev').replace(/\/+$/, '');

export const api = request(API_BASE_URL);

export const auth = (token) => ({ Authorization: token });
