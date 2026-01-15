import { getPostBySlug, getPosts } from '@/lib/cms';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
	const posts = await getPosts();
	return posts.data.map((p) => ({ slug: p.slug }));
}

// 1. Добавляем основной компонент страницы
// Это основной компонент страницы (Default Export)
export default async function PostPage({ params }: Props) {
  // В App Router params — это Promise, поэтому разворачиваем его через await 
  // (в Next.js 15 это обязательно)
  const { slug } = await params; 

  const post = await getPostBySlug(slug);

  // Если пост с таким слагом не нашелся в базе — показываем 404
  if (!post) {
    notFound();
  }

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <article className="prose lg:prose-xl mx-auto"> 
      <h1>{post.title}</h1>
      
      {/* Renderer принимает массив из Strapi и превращает его в теги p, h2, img и т.д. */}
      <BlocksRenderer content={post.content} />
    </article>
    </main>
  );
}