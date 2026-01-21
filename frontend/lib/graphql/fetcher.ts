const CMS_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_CMS_GRAPHQL_URL ||
  'http://localhost:1337/graphql';

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const res = await fetch(CMS_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('GraphQL request failed');
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error('GraphQL errors occurred');
  }

  return json.data;
}
