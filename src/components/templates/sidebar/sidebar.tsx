'use client';
import React, { FC, useEffect, useState } from 'react';
import './sidebar.scss';
import Image from 'next/image';
import PagesIcon from '@mui/icons-material/Pages';
import PersonIcon from '@mui/icons-material/Person';
import OpenCloseIcon from '@/public/icons/slider-open-close.svg';
import { Tooltip } from '@mui/material';
import { useSetRecoilState } from 'recoil';
import { useParams, useRouter } from 'next/navigation';
import useSWRMutation from 'swr/mutation';
import { MenuPanelType, UserType } from '@/utils/ts/types/global.types';
import { userState } from '@/store/atoms/user.atom';
import { axiosPostFetcher } from '@/utils/helpers/swr';
import { removeCookies } from '@/utils/helpers/cookies';
import { accessToken, refreshToken } from '@/utils/constants/global';
import LightDarkToggle from '@/components/molecules/light-dark-toggle/light-dark-toggle';

interface ISidebar {
  menu: Array<MenuPanelType>;
  user: UserType | null;
}

const Sidebar: FC<ISidebar> = ({ menu, user }) => {
  const router = useRouter();

  const setUser = useSetRecoilState(userState);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(true);

  const { trigger: signOut } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
    axiosPostFetcher,
    {
      onSuccess: () => {
        setUser(null);
        removeCookies(accessToken);
        removeCookies(refreshToken);
        router.push('/en/login');
      },
    },
  );

  const onHandleToggleColorMode = (type: 'light' | 'dark') => {
    const baseLayout = document.getElementById('menu-panel');

    if (baseLayout) {
      if (type === 'dark') {
        // Add 'dark-mode' and remove 'light-mode'
        baseLayout.classList.add('dark-mode');
        baseLayout.classList.remove('light-mode');
      } else {
        // Add 'light-mode' and remove 'dark-mode'
        baseLayout.classList.add('light-mode');
        baseLayout.classList.remove('dark-mode');
      }
    }
  };

  const onHandleLogOut = async () => {
    await signOut();
  };

  useEffect(() => {
    user && setUser(user);
  }, [setUser, user]);

  return (
    <>
      <div className={`sidebar ${isOpenMenu ? 'sidebar--open-menu' : ''}`}>
        <button
          className={'sidebar--open-close-button'}
          onClick={() => setIsOpenMenu(prev => !prev)}>
          <OpenCloseIcon />
        </button>

        <ul className={'sidebar--list'}>
          <li className={'sidebar--user-list'}>
            <div className={'sidebar--user-avatar-block'}>
              {user?.photo ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${user?.photo}`}
                  alt={'Avatar'}
                  width={150}
                  height={150}
                  className={'sidebar----user-avatar-block--user-avatar'}
                />
              ) : (
                <PersonIcon />
              )}
            </div>

            <div className={'sidebar----user-avatar-block--user-avatar-info'}>
              <p>{user?.name}</p>
              <p>{user?.last_name}</p>
            </div>
          </li>
        </ul>
        <ul className={'sidebar--list sidebar--pages-list'}>
          {menu.map(m => (
            <MenuPanelItem menu={m} isOpenMenu={isOpenMenu} key={m.id} />
          ))}
        </ul>

        <div className={'sidebar--color-mode-block'}>
          <LightDarkToggle isOpen={isOpenMenu} onHandleToggleColorMode={onHandleToggleColorMode} />
        </div>
        <div className={'sidebar--logout-block'}>
          <button onClick={onHandleLogOut} className={'sidebar--logout'}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

const MenuPanelItem = ({ menu, isOpenMenu }: { menu: MenuPanelType; isOpenMenu: boolean }) => {
  const router = useRouter();
  const { local } = useParams();

  const [isOpenSubMenu, setIsOpenSubMenu] = useState<boolean>(false);

  const onHandleNavigate = () => {
    router.push(`/${local}/${menu.name}?page=1`);
  };

  return (
    <Tooltip title={isOpenMenu ? '' : menu.title} placement={'right'}>
      <li className={'sidebar--menu-list'} onClick={onHandleNavigate}>
        <div className={'sidebar--menu-list--first-block'}>
          <>
            {menu.icon ? (
              <Image
                src={menu.icon}
                alt={'Avatar'}
                width={150}
                height={150}
                className={'sidebar--menu-icon'}
              />
            ) : (
              <PagesIcon />
            )}
          </>

          <p className={'sidebar--menu-title'}>{menu.title}</p>
          {menu.add_button ? (
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
            {menu.subMenu?.map(subMenu => (
              <li key={subMenu.id} className={'sidebar--menu-list'} onClick={onHandleNavigate}>
                <div className={'sidebar--menu-list--first-block'}>
                  {subMenu.icon ? (
                    <Image
                      src={subMenu.icon}
                      alt={'Avatar'}
                      width={150}
                      height={150}
                      className={'sidebar--menu-icon'}
                    />
                  ) : (
                    <PagesIcon />
                  )}

                  <p className={'sidebar--menu-title'}>{subMenu.title}</p>
                  {subMenu.add_button && <button className={'sidebar--menu-add-button'}>+</button>}
                  {subMenu.subMenu?.length && (
                    <button className={'sidebar--menu-sub-menu-button'}>{`>`}</button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </Tooltip>
  );
};
