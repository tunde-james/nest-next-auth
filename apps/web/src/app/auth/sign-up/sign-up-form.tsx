'use client';

import { useActionState } from 'react';

import SubmitButton from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUp } from '@/lib/auth';

function SignUpForm() {
  const [state, formAction] = useActionState(signUp, undefined);

  return (
    <form action={formAction}>
      {!!state?.message && (
        <p className="text-sm text-red-500 mb-2">{state.message}</p>
      )}

      <div className="flex flex-col space-y-4 w-[350px]">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>
        {!!state?.errors?.name && (
          <p className="text-sm text-red-500">{state.errors.name}</p>
        )}

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
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </div>
        {!!state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
}

export default SignUpForm;
