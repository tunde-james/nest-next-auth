import Link from 'next/link';
import SignUpForm from './sign-up-form';

function SignUpPage() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-[450px] flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>

      <SignUpForm />

      <div className="flex justify-between text-sm">
        <p>Already have an account?</p>
        <Link className="underline" href={'/auth/sign-in'}>
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
