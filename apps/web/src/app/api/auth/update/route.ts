import { NextRequest } from 'next/server';

import { getSession, updateTokens } from '@/lib/session';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { accessToken, refreshToken } = body;

  if (!accessToken || !refreshToken)
    return new Response('Provide tokens', { status: 401 });

  await updateTokens({ accessToken, refreshToken });

  return new Response('OK', { status: 200 });
}

// export async function POST(req: NextRequest) {
//   const sessionCookie = req.cookies.get('session')?.value;
//   if (!sessionCookie) return new Response('No session found', { status: 401 });

//   const { accessToken, refreshToken } = await req.json();

//   if (!accessToken || !refreshToken)
//     return new Response('Provide tokens', { status: 400 });

//   try {
//     await updateTokens({
//       accessToken,
//       refreshToken,
//       currentSession: sessionCookie,
//     });

//     return new Response('Tokens updated successfully', { status: 200 });
//   } catch (error) {
//     return new Response('Failed to update tokens', { status: 500 });
//   }
// }
