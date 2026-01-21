// app/posts/page.tsx
import { getPosts } from '@/lib/cms';
import styles from './page.module.css';
import Link from 'next/link';
import { PostNavigation } from '@/components/PostNavigation';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/utils';

export default async function PostsListPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page } = await searchParams; // Распаковываем Promise
	const currentPage = Number(page) || 1;
	const pageSize = 5;

	const { data, meta } = await getPosts(currentPage, pageSize);

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	return (
		<div className="container mx-auto">
			<h1 className="text-2xl font-bold mb-4">Блог</h1>
			<div className="grid gap-4 ">
				{data.map((post: any) => (
					<article className={styles.card} key={post.id}>
						{post.coverUrl && (
							<div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg border border-gray-100">
								<Image
									src={getStrapiMedia(post.coverUrl)!}
									alt={post.title}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									className="object-cover transition-transform duration-500 hover:scale-105"
									priority={currentPage === 1} // Оптимизация для первой страницы
								/>
							</div>
						)}
						<h2 className={styles.title}>
							<Link href={`/posts/${post.slug}`} className={styles.link}>
								{post.title}
							</Link>
						</h2>
						<time className="text-sm text-gray-500">{formatDate(post.publishedAt)}</time>
					</article>
				))}
			</div>

			<PostNavigation
				page={meta.page}
				hasNextPage={meta.hasNextPage}
				hasPrevPage={meta.hasPrevPage}
			/>
		</div>
	);
}
