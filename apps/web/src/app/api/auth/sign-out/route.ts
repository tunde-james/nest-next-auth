import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

import { deleteSession } from '@/lib/session';
import { authFetch } from '@/lib/auth-fetch';

export async function GET(req: NextRequest) {
  const response = await authFetch(`${process.env.BACKEND_URL}/auth/sign-out`, {
    method: 'POST',
  });

  if (response.ok) {
    await deleteSession();
  }

  revalidatePath('/', 'layout');
  revalidatePath('/', 'page');
  return NextResponse.redirect(new URL('/', req.nextUrl));
}
