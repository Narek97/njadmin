import React, { FC } from 'react';
import { accessToken } from '@/utils/constants/global';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IAuthLayout {
  children: React.ReactNode;
}
const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get(accessToken);

  if (token) {
    redirect('/en/home');
  }
  return <>{children}</>;
};

export default AuthLayout;
