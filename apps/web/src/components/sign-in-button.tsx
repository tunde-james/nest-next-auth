import Link from 'next/link';
import { getSession } from '@/lib/session';

async function SignInButton() {
  const session = await getSession();

  return (
    <div className="flex items-center gap-2 ml-auto">
      {!session || !session.user ? (
        <>
          <Link href="/auth/sign-in">Sign In</Link>
          <Link href="/auth/sign-up">Sign Up</Link>
        </>
      ) : (
        <>
          <p>{session.user.name}</p>
          <a href="/api/auth/sign-out">Sign Out</a>
        </>
      )}
    </div>
  );
}

export default SignInButton;
