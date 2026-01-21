// app/page.tsx
import PostsListPage from './posts/page'; // Убедитесь, что путь верный

export default async function HomePage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const resolvedParams = await searchParams;
	const key = resolvedParams.page || '1'; // Создаем уникальный ключ для каждой страницы
	// Просто пробрасываем Promise в ваш компонент списка
	return (
		<main>
			<PostsListPage key={key} searchParams={searchParams} />
		</main>
	);
}
