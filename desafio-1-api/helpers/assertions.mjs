import { expect } from '@jest/globals';

export function expectJsonResponse(response, status, { cors = true } = {}) {
  expect(response.status).toBe(status);
  expect(response.headers['content-type']).toMatch(/application\/json/);

  if (cors) {
    expect(response.headers['access-control-allow-origin']).toBe('*');
  }
}
