import React, { FC } from 'react';
import MenuPanelLayout from '@/layouts/menu-panel-layout/menu-panel-layout';

interface IAuthLayout {
  children: React.ReactNode;
}
const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  // const token = getCookies(ACCESS_TOKEN || '');
  // if (!token?.value) {
  //   redirect('/en/login');
  // }
  return (
    <>
      <MenuPanelLayout>{children}</MenuPanelLayout>
    </>
  );
};

export default AuthLayout;
