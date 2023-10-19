import { Fira_Mono, Noto_Sans_KR } from 'next/font/google';

import ReactQueryProvider from '@providers/ReactQueryProvider';

import '@styles/global.css';

const notoSansKr = Noto_Sans_KR({
  preload: false,
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
});

const firaMono = Fira_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-fira-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${notoSansKr.className} ${firaMono.variable}`}>
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
