import { atom } from 'recoil';
import { UserType } from '@/utils/ts/types/global.types';

export const userState = atom({
  key: 'userStateKey',
  default: null as UserType | null,
});
