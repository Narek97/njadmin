import React, { FC } from 'react';
import { redirect } from 'next/navigation';
import { ACCESS_TOKEN } from '@/utils/constants/global';
import { getCookies } from '@/utils/helpers/cookies';

interface IAuthLayout {
  children: React.ReactNode;
}
const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const token = getCookies(ACCESS_TOKEN || '');
  if (token?.value) {
    redirect('/en/home');
  }
  return <>{children}</>;
};

export default AuthLayout;
