'use server';

import { authFetch } from './auth-fetch';
import { getSession } from './session';

export async function getProfile() {
  // const session = await getSession();
  // const response = await fetch(`${process.env.BACKEND_URL}/auth/protected`, {
  //   headers: {
  //     Authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });

  const response = await authFetch(`${process.env.BACKEND_URL}/auth/protected`);

  const result = await response.json();
  return result;
}
