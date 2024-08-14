import React, { FC } from 'react';
import './menu-panel-layout.scss';
import { MenuPanelType, UserType } from '@/utils/ts/types/global.types';
import Sidebar from '@/components/templates/sidebar/sidebar';
import getAdminMenu from '@/api/getAdminMenu';
import getMe from '@/api/getMe';
import MenuPanelClientLayout from '@/layouts/menu-panel-layout/menu-panel-client-layout/menu-panel-client-layout';

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
    <div className={'menu-panel-layout'}>
      {error && false ? (
        <p className={'base-error'}>{error}</p>
      ) : (
        <div className={'menu-panel-layout--content'}>
          <Sidebar menu={menu} user={user} />
          <div className={'menu-panel-layout--children'}>
            <MenuPanelClientLayout>{children}</MenuPanelClientLayout>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPanelLayout;
