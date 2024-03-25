import { SignInForm } from '@/src/pages/signIn/SignInForm';
import useAuth from "@/src/modules/auth/useAuth";
import {useCallback} from "react";

const SignIn = () => {

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm />

        <p className="mt-10 text-center text-sm text-gray-500 gap-2">
          Not a member?
          <a href="#" className="font-semibold leading-6">
            Start a 14 day free trial
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
