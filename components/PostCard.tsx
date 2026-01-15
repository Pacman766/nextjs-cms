import Link from 'next/link';
import { Post } from '@/lib/types';

type Props = {
	post: Post;
};

export function PostCard({ post }: Props) {
	const { title, slug } = post;

	return (
		<article>
			<h2>
				<Link href={`/posts/${slug}`}>{title}</Link>
			</h2>
		</article>
	);
}
