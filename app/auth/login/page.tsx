'use client';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SignIn
        routing="path"
        path="/auth/login"
        signUpUrl="/auth/signup"
        appearance={{
          elements: {
            rootBox: 'flex justify-center items-center min-h-screen w-full',
            card: 'w-full max-w-sm shadow-none',
            cardBox: 'w-full',
            formButtonPrimary: 'bg-teal-600 hover:bg-teal-700 text-white rounded-full py-3 font-semibold',
            formFieldInput: 'border-0 border-b-2 border-slate-300 rounded-none py-2 focus:border-teal-600 focus:shadow-none',
            socialButtonsBlockButton: 'border-2 border-slate-300 rounded-xl py-3 hover:border-slate-400',
            dividerLine: 'bg-slate-300',
            dividerText: 'text-slate-600',
            footerActionLink: 'text-teal-600 hover:text-teal-700 font-semibold',
          },
        }}
      />
    </div>
  );
}
