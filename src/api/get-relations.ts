export default async function getRelations(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/relations`, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }),
    cache: 'no-store', // Ensure no caching for dynamic data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
