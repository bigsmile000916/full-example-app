import Link from 'next/link';
import React, { FC } from 'react';
import { login } from '../lib/auth';
import Logo from './logo';

const SigninSignupForm: FC<{
  mode: 'signin' | 'signup';
}> = ({ mode }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-[url(/background.jpg)] bg-center bg-cover">
      <div className="text-center px-10 py-20 rounded-md shadow-lg from-slate-900 bg-gradient-to-t to-slate-800 max-w-md w-full">
        <div className="mb-10">
          <Logo />
        </div>
        <button
          className="px-4 py-3 shadow w-full rounded-full bg-[#EA4335] text-white"
          onClick={login}
        >
          Google で{mode === 'signin' ? 'ログイン' : 'アカウント作成'}
        </button>
        {mode === 'signin' ? (
          <p className="text-slate-400 text-sm pt-10 mt-10 border-t border-slate-800">
            アカウントがまだありませんか？
            <Link href="/signup">
              <a className="text-blue-500">アカウントを作成</a>
            </Link>
          </p>
        ) : (
          <p className="text-slate-400 text-sm pt-10 mt-10 border-t border-slate-800">
            アカウントが既にありますか？
            <Link href="/signin">
              <a className="text-blue-500">ログイン</a>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SigninSignupForm;
