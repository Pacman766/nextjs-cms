import { fetchGraphQL } from "./graphql/fetcher";
import { POSTS_QUERY } from "./graphql/posts";

const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
	throw new Error('CMS_URL is not defined in environment variables');
}

export async function getPosts(
  page: number = 1,
  pageSize: number = 5
) {
  const data = await fetchGraphQL<{ posts: any[] }>(
    POSTS_QUERY,
    { page, pageSize }
  );

  const posts = data.posts.map((post) => ({
    documentId: post.documentId,
    title: post.title,
    slug: post.slug,
    content: post.content,
    createdAt: post.createdAt,
    publishedAt: post.publishedAt,
    coverUrl: post.cover?.url ?? null,
  }));

  return {
    data: posts,
    meta: {
      page,
      pageSize,
      hasPrevPage: page > 1,
      hasNextPage: posts.length === pageSize,
    },
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
