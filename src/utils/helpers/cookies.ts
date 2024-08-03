import { cookies } from 'next/headers';
import { Cookie } from '@/utils/ts/types/global.types';

export const getCookies = (name: string): Cookie | undefined => {
  const cookieStore = cookies() as any;
  return cookieStore.get(name);
};
