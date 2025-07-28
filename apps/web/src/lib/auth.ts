'use server';

import { redirect } from 'next/navigation';
import z from 'zod';

import { FormState } from './type';
import { LoginFormSchema, SignupFormSchema } from './zod-schemas';
import { createSession, updateTokens } from './session';

export async function signUp(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    return {
      message: res.status === 409 ? 'User already exist' : res.statusText,
    };
  }

  redirect('/auth/sign-in');
}

export async function signIn(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: z.flattenError(validatedFields.error).fieldErrors,
    };
  }

  const res = await fetch(`${process.env.BACKEND_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    return {
      message: res.status === 401 ? 'Invalid credentials' : res.statusText,
    };
  }

  const result = await res.json();

  await createSession({
    user: {
      id: result.id,
      name: result.name,
    },
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  });

  redirect('/');
}

export async function refreshToken(oldRefreshToken: string) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: oldRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token' + response.statusText);
    }

    const { accessToken, refreshToken } = await response.json();

    // update session with new tokens
    const updateRes = await fetch(
      `${process.env.FRONTEND_URL}/api/auth/update`,
      {
        method: 'POST',
        body: JSON.stringify({
          accessToken,
          refreshToken,
        }),
      }
    );

    if (!updateRes.ok) throw new Error('Failed to updated the tokens');

    return accessToken;
  } catch (error) {
    console.error('Refresh token failed', error);
    return null;
  }
}
