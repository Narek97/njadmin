'use client';
import React, { FC, useState } from 'react';
import './sidebar.scss';
import Image from 'next/image';
import { MenuPanelType, UserType } from '@/utils/ts/types/global.types';

interface ISidebar {
  menu: Array<MenuPanelType>;
  user: UserType;
}

const Sidebar: FC<ISidebar> = ({ menu, user }) => {
  console.log(menu, 'menu');
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <>
      <div className={`sidebar ${isOpenMenu ? 'sidebar--open-menu' : ''}`}>
        <button
          onClick={() => setIsOpenMenu(prev => !prev)}
          className={'sidebar--open-close-button'}>
          {`>`}
        </button>

        <ul className={'sidebar--list'}>
          <li className={'sidebar--user-list'}>
            <div className={'sidebar--user-avatar-block'}>
              <Image
                src={user.avatar}
                alt={'Avatar'}
                width={150}
                height={150}
                className={'sidebar--user-avatar'}
              />
            </div>

            <div className={'sidebar--user-avatar-info'}>
              <p>{user.name}</p>
              <p>{user.surName}</p>
            </div>
          </li>
          {menu.map(m => (
            <MenuPanelItem menu={m} key={m.id} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

const MenuPanelItem = ({ menu }: { menu: MenuPanelType }) => {
  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false);

  return (
    <li className={'sidebar--menu-list'}>
      <div className={'sidebar--menu-list--first-block'}>
        {menu.icon && (
          <Image
            src={menu.icon}
            alt={'Avatar'}
            width={150}
            height={150}
            className={'sidebar--menu-icon'}
          />
        )}

        <p className={'sidebar--menu-title'}>{menu.title}</p>
        {menu.addButton ? (
          <button className={'sidebar--menu-add-button'}>+</button>
        ) : (
          <div className={'sidebar--menu-empty-button'} />
        )}
        {menu.subMenu?.length ? (
          <button
            className={'sidebar--menu-sub-menu-button'}
            onClick={() => setIsOpenSubMenu(prev => !prev)}>{`>`}</button>
        ) : (
          <div className={'sidebar--menu-empty-button'} />
        )}
      </div>
      <div className={`${isOpenSubMenu ? 'sidebar--open-sub-menu' : 'sidebar--close-sub-menu'}`}>
        <ul className={'sidebar--menu-list--second-block'}>
          {menu.subMenu?.map(sumBenu => (
            <li key={sumBenu.id} className={'sidebar--menu-list'}>
              <div className={'sidebar--menu-list--first-block'}>
                {sumBenu.icon && (
                  <Image
                    src={sumBenu.icon}
                    alt={'Avatar'}
                    width={150}
                    height={150}
                    className={'sidebar--menu-icon'}
                  />
                )}

                <p className={'sidebar--menu-title'}>{sumBenu.title}</p>
                {sumBenu.addButton && <button className={'sidebar--menu-add-button'}>+</button>}
                {sumBenu.subMenu?.length && (
                  <button className={'sidebar--menu-sub-menu-button'}>{`>`}</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
