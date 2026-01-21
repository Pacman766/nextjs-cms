import styles from '../page.module.css';
import { getPostBySlug } from '@/lib/cms';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';

export default async function SinglePostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const post = await getPostBySlug(slug);

	if (!post) notFound();

	return (
		<article className={styles.post}>
			<h1 className={styles.title}>{post.title}</h1>
			{/* Используем рендерер для контента из PostgreSQL */}
			<div className={styles.content}>
				<BlocksRenderer content={post.content} />
			</div>
		</article>
	);
}
