'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signIn } from '@/lib/auth';

function SignInForm() {
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <form action={formAction}>
      {!!state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      <div className="flex flex-col gap-2 w-64">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="john@example.com"
          />
        </div>
        {!!state?.errors?.email && (
          <p className="text-sm text-red-500">{state.errors.email}</p>
        )}

        <div>
          <Label htmlFor="password">Email</Label>
          <Input type="password" id="password" name="password" />
        </div>
        {!!state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors?.password}</p>
        )}

        <Link className="text-sm underline" href="#">
          Forgot your password?
        </Link>

        <SubmitButton>Sign In</SubmitButton>

        <div className="flex text-sm">
          <p className="mr-1"> Don't have an account?</p>
          <Link className="text-sm underline" href="/auth/sign-up">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignInForm;
