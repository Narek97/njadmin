import { atom } from 'recoil';

export const countriesState = atom({
  key: 'countriesStateKey',
  default: [] as Array<{ id: number; name: string; type: string }>,
});

export const cityState = atom({
  key: 'cityStateKey',
  default: [] as Array<{ id: number; name: string; type: string }>,
});
