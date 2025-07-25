'use server';

import { redirect } from 'next/navigation';
import z, { json } from 'zod';

import { FormState } from './type';
import { LoginFormSchema, SignupFormSchema } from './zod-schemas';

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

  // create session for authenticated user

  const result = await res.json();
  console.log({ result });
}
