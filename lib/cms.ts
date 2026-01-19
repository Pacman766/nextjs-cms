const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
	throw new Error('CMS_URL is not defined in environment variables');
}

export async function getPosts(page: number = 1, pageSize: number = 5) {
	const res = await fetch(
		`${CMS_URL}/api/posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
		{
			// next: { revalidate: 60 },
			cache: 'no-store',
		},
	);

	if (!res.ok) {
		throw new Error('Failed to fetch posts');
	}

	const json = await res.json();

	return {
		data: json.data.map((post: any) => ({
			id: post.id,
			documentId: post.documentId,
			title: post.title,
			slug: post.slug,
			content: post.content,
			createdAt: post.createdAt,
			publishedAt: post.publishedAt,
			coverUrl: post.cover?.url || null,
		})),
		meta: json.meta.pagination,
	};
}

export async function getPostBySlug(slug: string) {
	// Мы ищем пост, где поле slug равно значению из URL
	const res = await fetch(`${CMS_URL}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
		next: { revalidate: 60 },
	});

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
		content: post.content,
		createdAt: post.createdAt,
		publishedAt: post.publishedAt,
	};
}
