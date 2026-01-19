'use client';

import { Button } from './ui/button';
import Link from 'next/link';

export function PostNavigation({ page, pageCount }: { page: number; pageCount: number }) {
	return (
		<nav className="flex justify-between mt-10">
			{page > 1 ? (
				<Button asChild variant="outline">
					<Link href={`/posts?page=${page - 1}`}>← Назад</Link>
				</Button>
			) : (
				<span className="text-gray-400">← Назад</span>
			)}
			{page < pageCount ? (
				<Button asChild variant="outline">
					<Link href={`/posts?page=${page + 1}`}>Вперёд →</Link>
				</Button>
			) : (
				<span className="text-gray-400">Вперёд →</span>
			)}
		</nav>
	);
}
