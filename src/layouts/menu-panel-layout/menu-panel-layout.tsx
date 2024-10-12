import React, { FC } from 'react';
import './menu-panel-layout.scss';
import { MenuPanelType, UserType } from '@/utils/ts/types/global.types';
import Sidebar from '@/components/templates/sidebar/sidebar';
import getAdminMenu from '@/api/get-admin-menu';
import getMe from '@/api/get-me';

interface IMenuPanelLayout {
  children: React.ReactNode;
}

const MenuPanelLayout: FC<IMenuPanelLayout> = async ({ children }) => {
  let error: string = '';
  let menu: Array<MenuPanelType> = [];
  let user: UserType | null = null;

  try {
    menu = await getAdminMenu();
    user = await getMe();
  } catch (err: any) {
    error = err;
  }

  return (
    <div className={'menu-panel-layout light-mode'} id={'menu-panel'}>
      {error && false ? (
        <p className={'base-error'}>{error}</p>
      ) : (
        <div className={'menu-panel-layout--content'}>
          <Sidebar menu={menu} user={user} />
          <div className={'menu-panel-layout--children'}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default MenuPanelLayout;
