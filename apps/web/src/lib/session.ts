'use server';

import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { Role } from './type';

export type Session = {
  user: {
    id: string;
    name: string;
    role: Role;
  };
  accessToken: string;
  refreshToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7days

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);

  (await cookies()).set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ['HS256'],
    });

    return payload as Session;
  } catch (error) {
    console.error('Failed to verify session:', error);
    redirect('/auth/sign-in');
  }
}

export async function deleteSession() {
  (await cookies()).delete('session');
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookie = (await cookies()).get('session')?.value;
  if (!cookie) return null;

  const { payload } = await jwtVerify<Session>(cookie, encodedKey);
  if (!payload) {
    throw new Error('Session not found!');
  }

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  };

  await createSession(newPayload);
}

// export async function updateTokens({
//   accessToken,
//   refreshToken,
//   currentSession,
// }: {
//   accessToken: string;
//   refreshToken: string;
//   currentSession: string;
// }) {
//   const { payload } = await jwtVerify<Session>(currentSession, encodedKey);

//   if (!payload) throw new Error('Session not found!');

//   const newPayload: Session = {
//     user: {
//       ...payload.user,
//     },
//     accessToken,
//     refreshToken,
//   };

//   await createSession(newPayload);
// }
