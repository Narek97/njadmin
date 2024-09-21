import React, { FC } from 'react';
import BaseLayout from '@/layouts/base-layout/base-layout';
import MenuPanelLayout from '@/layouts/menu-panel-layout/menu-panel-layout';
import { accessToken } from '@/utils/constants/global';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IAuthLayout {
  children: React.ReactNode;
}
const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  const cookieStore = cookies();
  const token = cookieStore.get(accessToken);

  if (!token?.value) {
    redirect('/en/login');
  }

  return (
    <MenuPanelLayout>
      <BaseLayout>{children}</BaseLayout>
    </MenuPanelLayout>
  );
};

export default AuthLayout;
