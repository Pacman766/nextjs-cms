import Link from 'next/link';
import { Button } from './ui/button';

type Props = {
	page: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
};

export function PostNavigation({ page, hasNextPage, hasPrevPage }: Props) {
	return (
		<div className="flex justify-between mt-10">
			{hasPrevPage ? (
				<Button variant="outline">
					<Link href={`/posts?page=${page - 1}`}>← Назад</Link>
				</Button>
			) : (
				<span />
			)}

			{hasNextPage && (
				<Button variant="outline">
					<Link href={`/posts?page=${page + 1}`}>Вперёд →</Link>
				</Button>
			)}
		</div>
	);
}
