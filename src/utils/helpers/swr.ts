import axios from 'axios';
// import { getCookies } from '@/utils/helpers/cookies';

export const axiosGetFetcher = async (url: string) => {
  // const token = getCookies(process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'instant-token');
  const token = '';
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw { message: error.message, status: error.response.status };
  }
};

export const axiosPostFetcher = async (url: string, { arg }: { arg: any }) => {
  const isFormData = arg instanceof FormData;
  // const token = getCookies(process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'instant-token');
  const token = '';

  const method = isFormData ? arg.get('method') : arg.method;

  try {
    const response = await axios({
      url,
      data: arg,
      method: method || 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || 'Network error';
  }
};