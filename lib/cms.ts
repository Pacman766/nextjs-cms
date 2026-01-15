const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
	throw new Error('CMS_URL is not defined in environment variables');
}

export async function getPosts() {
	const res = await fetch(`${CMS_URL}/api/posts?populate=*`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch posts');
	}

	 const json = await res.json();

	return {
    data: json.data.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
    })),
  };
}

export async function getPostBySlug(slug: string) {
  // Мы ищем пост, где поле slug равно значению из URL
  const res = await fetch(
    `${CMS_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`, 
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch post: ${slug}`);
  }

  const json = await res.json();

  // API обычно возвращает массив данных, даже если мы ищем один элемент
  if (!json.data || json.data.length === 0) {
    return null;
  }

  const post = json.data[0];

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    content: post.content, // Здесь полный текст статьи
  };
}
