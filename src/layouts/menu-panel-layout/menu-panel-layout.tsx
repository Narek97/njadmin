import React, { FC } from 'react';
import './menu-panel-layout.scss';
import { MenuPanelType } from '@/utils/ts/types/global.types';
import Sidebar from '@/components/templates/sidebar/sidebar';
import getAdminMenu from '@/api/getAdminMenu';

interface IMenuPanelLayout {
  children: React.ReactNode;
}

const data: Array<MenuPanelType> = [
  {
    id: 1,
    title: 'Jobs',
    icon: 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
  },
  {
    id: 2,
    title: 'Urish table erkara anunov miban',
    icon: 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
    addButton: true,
  },
  {
    id: 3,
    title: 'Submenu',
    icon: 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
    addButton: true,
    subMenu: [
      {
        id: 1,
        title: '1',
      },
      {
        id: 2,
        title: '2',
      },
      {
        id: 3,
        icon: 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
        title: '1sadasdsad',
      },
      {
        id: 4,
        title: '1dsfdsbfdskhfkjdsh',
      },
      {
        id: 5,
        title: '1dsfdsbfdskhfkjdsh',
      },
      {
        id: 6,
        title: '1dsfdsbfdskhfkjdsh',
      },
    ],
  },
  {
    id: 4,
    title: 'Urish table erkara anunov miban',
    icon: 'https://www.copahost.com/blog/wp-content/uploads/2019/07/imgsize2.png',
    addButton: true,
  },
];

const user = {
  avatar:
    'https://img.freepik.com/premium-photo/web-developer-digital-avatar-generative-ai_934475-9048.jpg',
  name: 'poxos',
  surName: 'poxosyan',
};

const MenuPanelLayout: FC<IMenuPanelLayout> = async ({ children }) => {
  let error: string = '';
  let menu: Array<MenuPanelType> = [];

  try {
    menu = await getAdminMenu();
  } catch (err: any) {
    error = err;
  }

  return (
    <div className={'menu-panel-layout'}>
      {error && false ? (
        <p className={'base-error'}>{error}</p>
      ) : (
        <div className={'menu-panel-layout--content'}>
          <Sidebar menu={data} user={user} />
          <div className={'menu-panel-layout--children'}>{children}</div>
        </div>
      )}
    </div>
  );
};

export default MenuPanelLayout;
