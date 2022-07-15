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

const SiteName = 'Lorem';
const ORIGIN =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://xxx.com';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider attribute="class" enableColorScheme={false}>
      <AuthProvider>
        <DefaultSeo
          titleTemplate={`%s | ${SiteName}`}
          defaultTitle={SiteName}
          description="デモサイト"
          openGraph={{
            type: 'website',
            url: ORIGIN,
            site_name: SiteName,
            images: [
              {
                url: ORIGIN + '/ogp.png',
              },
            ],
          }}
          twitter={{
            site: '@d151005',
            cardType: 'summary_large_image',
          }}
        />
        <div className="dark:text-slate-200 min-h-screen dark:bg-slate-900 bg-slate-100 text-slate-800">
          {getLayout(<Component {...pageProps} />)}
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
