import { atom } from 'recoil';

export const codeState = atom({
  key: 'codeStateKey',
  default: [] as Array<{ id: number; name: string; code: string }>,
});
