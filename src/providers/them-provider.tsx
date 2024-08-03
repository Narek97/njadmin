'use client';
import React, { FC } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { theme } from '@/assets/mui/them';

interface IThemProviderProps {
  children: React.ReactNode;
}

const ThemProvider: FC<IThemProviderProps> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default ThemProvider;
