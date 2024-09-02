import axios from 'axios';
import { accessToken, refreshToken } from '@/utils/constants/global';
import { getCookies, removeCookies, setCookies } from '@/utils/helpers/cookies';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

axios.interceptors.response.use(
  config => {
    return config;
  },
  async error => {
    const currentRefreshToken = getCookies(
      process.env.NEXT_PUBLIC_REFRESH_TOKEN || 'nuevo-refresh',
    );

    const originalRequest = error.config;

    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await $api.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/token`,
          {
            token: currentRefreshToken,
          },
          {
            withCredentials: true,
          },
        );
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setCookies(accessToken, response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        removeCookies(accessToken);
        removeCookies(refreshToken);
        window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/signin`;
      }
    }
    throw error;
  },
);

export const axiosGetFetcher = async (url: string) => {
  const token = getCookies(process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'nuevo-access');

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the authorization token to the request
        'Content-Type': 'application/json', // Set the appropriate content type
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message;
  }
};

export const axiosPostFetcher = async (url: string, { arg }: { arg: any }) => {
  const isFormData = arg instanceof FormData;
  const token = getCookies(accessToken);
  const method = isFormData ? arg?.get('method') : arg?.method;

  try {
    const response = await axios({
      url,
      data: arg,
      method: method || 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Add the authorization token to the request
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json', // Set the appropriate content type
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Network error';
  }
};
