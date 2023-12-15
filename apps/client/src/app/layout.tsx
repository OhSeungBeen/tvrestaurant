import { cache } from 'react';
import { Metadata } from 'next';

import { env } from '@/env';
import Toast from '@components/Toast';
import { firaMono } from '@lib/fonts/google';
import { pretendard } from '@lib/fonts/local';
import ReactQueryProvider from '@providers/ReactQueryProvider';
import ThemeProvider from '@providers/ThemeProvider';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import '@styles/global.css';

export const metadata: Metadata = {
  title: '내 주변 맛집, 티비레스토랑',
  description: '내 주변 TV, YouTube등 미디어에 방영된 맛집을 쉽게 찾아보세요.',
  icons: {
    icon: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicons/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/favicons/favicon-192x192.png',
      },
    ],
    apple: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        url: '/favicons/favicon-180x180.png',
      },
    ],
  },
  openGraph: {
    title: '내 주변 맛집, 티비레스토랑',
    description: '반가워요! 링크를 확인해주세요 :-)',
    images: [`${env.appHost}/og`],
  },
  other: {
    'format-detection': 'telephone=no, date=no, email=no, address=no',
  },
};

type Props = {
  children: React.ReactNode;
};

const getQueryClient = cache(() => new QueryClient());

export default function RootLayout({ children }: Props) {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="ko" className={`${pretendard.className} ${firaMono.variable}`}>
      <body className="text-slate-800 dark:text-slate-100">
        <ReactQueryProvider dehydratedState={dehydratedState}>
          <ThemeProvider>
            <Toast />
            {children}
          </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
