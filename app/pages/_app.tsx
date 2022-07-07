import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import '../styles/globals.css';
import { AuthProvider } from '../context/auth';
import { Toaster } from 'react-hot-toast';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <div className="text-slate-200">
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Toaster />
    </AuthProvider>
  );
}
