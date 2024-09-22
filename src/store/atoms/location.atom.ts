import { atom } from 'recoil';

export const locationState = atom({
  key: 'locationStateKey',
  default: [] as Array<{ id: number; name: string; type: string }>,
});
