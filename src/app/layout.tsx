import React from 'react';
import '@/assets/styles/base.scss';
import RecoilProvider from '@/providers/recoil-provider';
import ThemProvider from '@/providers/them-provider';
import SwrProvider from '@/providers/swr-provider';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body>
        <RecoilProvider>
          <ThemProvider>
            <SwrProvider>{children}</SwrProvider>
          </ThemProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
