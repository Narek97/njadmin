export default async function getAdminMenu() {
  // const token = getCookies('suitecx-token');
  // console.log(token, 'token');

  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/menu`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5vcm9udEBtYWlsLnJ1IiwiaWF0IjoxNzIzMjkyNzkxLCJleHAiOjE3MjM2MzgzOTF9.4d8aQSrCnL2cRnxixeDRB1FGRH3-9yYZqo0OmKAPWu8`,
    }),
  }).then(async res => {
    const data = await res.json();
    if (!res.ok) throw data.message;
    return data;
  });
}
