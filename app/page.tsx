// app/page.tsx
import { PostCard } from '@/components/PostCard';
import { getPosts } from '@/lib/cms';
import { Post } from '@/lib/types';

export default async function HomePage() {
	const posts = await getPosts();

	return (
		<main>
			{posts.data.map((post: Post) => (
				<PostCard key={post.id} post={post} />
			))}
		</main>
	);
}
