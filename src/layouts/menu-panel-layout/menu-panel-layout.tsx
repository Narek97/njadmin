'use client';
import React, { FC, useState } from 'react';
import './menu-panel-layout.scss';
import { MenuPanelType } from '@/utils/ts/types/global.types';

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
        title: '1sadasdsad',
      },
      {
        id: 4,
        title: '1dsfdsbfdskhfkjdsh',
      },
    ],
  },
];

const MenuPanelLayout: FC<IMenuPanelLayout> = ({ children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className={'menu-panel-layout'}>
      <div
        className={`menu-panel-layout--menu ${isOpenMenu ? 'menu-panel-layout--open-menu' : ''}`}>
        <button
          onClick={() => setIsOpenMenu(prev => !prev)}
          className={'menu-panel-layout--menu--open-close-button'}>
          {`>`}
        </button>

        <ul>
          {/*{data.map(m => (*/}
          {/*  <li key={m.id}>{m.title}</li>*/}
          {/*))}*/}
        </ul>
      </div>
      <div className={'menu-panel-layout--children'}>{children}</div>
    </div>
  );
};

export default MenuPanelLayout;
