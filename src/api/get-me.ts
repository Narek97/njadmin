import { accessToken } from '@/utils/constants/global';
import { cookies } from 'next/headers';

export default async function getMe() {
  const cookieStore = cookies();
  const token = cookieStore.get(accessToken);

  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/get-me  `, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token?.value}`,
    }),
  }).then(async res => {
    const data = await res.json();
    if (!res.ok) throw data.message;
    return data;
  });
}
