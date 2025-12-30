// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.data.map((p) => ({ slug: p.attributes.slug }));
}
