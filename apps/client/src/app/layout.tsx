import { firaMono, notoSansKr } from '@lib/fonts/google';
import ReactQueryProvider from '@providers/ReactQueryProvider';

import '@styles/global.css';

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
