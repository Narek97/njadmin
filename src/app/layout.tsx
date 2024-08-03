import React from 'react';
import '@/assets/styles/base.scss';
import RecoilProvider from '@/providers/recoil-provider';
import ThemProvider from '@/providers/them-provider';

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
          <ThemProvider>{children}</ThemProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
