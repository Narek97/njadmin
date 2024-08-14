import { atom } from 'recoil';

export const isWhiteModeState = atom({
  key: 'isWhiteModeStateKey',
  default: true as boolean,
});

export const colorModeState = atom({
  key: 'colorModeStateKey',
  default: {
    white: '#ffffff',
    dark: '#404040',
  },
});
