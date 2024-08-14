export default async function login(data: { email: string; password: string }) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login  `, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(data),
  }).then(async res => {
    const data = await res.json();
    if (!res.ok) throw data.message;
    return data;
  });
}
