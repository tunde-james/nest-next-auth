import SignInForm from './sign-in-form';

const SignInPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center ">
      <h1 className="text-center text-2xl font-bold mb-4">Sign In Page</h1>

      <SignInForm />

      <hr />

      <a
        href={`${process.env.BACKEND_URL}/auth/google/login`}
        className="border px-4 py-2 rounded bg-sky-600 text-white"
      >
        Sign In With Google
      </a>

      <div className=" flex flex-col gap-2"></div>
    </div>
  );
};

export default SignInPage;
