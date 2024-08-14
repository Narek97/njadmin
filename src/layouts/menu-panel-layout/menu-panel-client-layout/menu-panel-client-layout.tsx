'use client';
import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colorModeState, isWhiteModeState } from '@/store/atoms/color-mode.atom';

interface IMenuPanelClientLayout {
  children: React.ReactNode;
}

const MenuPanelClientLayout: FC<IMenuPanelClientLayout> = ({ children }) => {
  const colorMode = useRecoilValue(colorModeState);
  const [isWhiteMode, setIsWhiteMode] = useRecoilState(isWhiteModeState);

  return (
    <div
      style={{
        height: '100dvh',
        transition: '.3s',
        backgroundColor: isWhiteMode ? colorMode.white : colorMode.dark,
      }}>
      {children}
    </div>
  );
};

export default MenuPanelClientLayout;
