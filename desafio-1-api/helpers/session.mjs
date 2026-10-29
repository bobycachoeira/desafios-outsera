import { login } from './auth.api.mjs';
import { createUser } from './users.api.mjs';

export async function createSession(data) {
  const userResponse = await createUser(data);
  const loginResponse = await login(data.email, data.password);

  return {
    id: userResponse.body._id,
    token: loginResponse.body.authorization,
    user: { ...data, _id: userResponse.body._id },
  };
}
