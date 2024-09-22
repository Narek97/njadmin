import { atom } from 'recoil';

export const industryState = atom({
  key: 'industryStateKey',
  default: [] as Array<{ id: number; title: string }>,
});
