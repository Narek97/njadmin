import React, { FC, useRef, useState } from 'react';
import './light-dark-toggle.scss';
import LightMode from '@/public/icons/light-mode.svg';
import DarkMode from '@/public/icons/dark-mode.svg';

interface ILightDarkToggle {
  isOpen: boolean;
  onHandleToggleColorMode: (mode: 'light' | 'dark') => void;
}

const LightDarkToggle: FC<ILightDarkToggle> = ({ isOpen, onHandleToggleColorMode }) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const onHandleToggle = (mode: 'light' | 'dark') => {
    setMode(mode);
    onHandleToggleColorMode(mode);
    toggleRef.current?.classList.toggle('move');
  };

  return (
    <div
      className="light-dark-toggle"
      style={{
        width: isOpen ? '110px' : '54px',
      }}>
      <div className="light-dark-toggle--toggle" ref={toggleRef} />

      <div
        className="light-dark-toggle--light"
        onClick={() => mode === 'dark' && onHandleToggle('light')}>
        <LightMode fill="#ffffff" />
        {isOpen ? <span>Light</span> : null}
      </div>

      <div
        className="light-dark-toggle--dark"
        onClick={() => mode === 'light' && onHandleToggle('dark')}>
        <DarkMode fill="#ffffff" />
        {isOpen ? <span>Dark</span> : null}
      </div>
    </div>
  );
};

export default LightDarkToggle;
