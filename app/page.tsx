// app/page.tsx
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/lib/cms';

export default async function HomePage() {
	const posts = await getPosts();

	return (
		<main>
			{posts.data.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</main>
	);
}
