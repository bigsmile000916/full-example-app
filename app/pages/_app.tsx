import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import '../styles/globals.css';
import { AuthProvider } from '../context/auth';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider attribute="class" enableColorScheme={false}>
      <AuthProvider>
        <DefaultSeo
          titleTemplate="%s | Lorem"
          defaultTitle="Lorem"
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.url.ie/',
            site_name: 'SiteName',
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <div className="text-slate-200 min-h-screen bg-slate-900">
          {getLayout(<Component {...pageProps} />)}
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
