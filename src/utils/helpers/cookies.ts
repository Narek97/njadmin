import { deleteCookie, getCookie, setCookie } from 'cookies-next';

export const setCookies = (name: string, value: string) => {
  return setCookie(name, value, {
    path: '/',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });
};

export const getCookies = (name: string) => {
  return getCookie(name);
};

export const removeCookies = (name: string) => {
  return deleteCookie(name, {
    path: '/',
    domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
  });
};
