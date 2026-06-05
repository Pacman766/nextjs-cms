import Link from 'next/link';
import { getGenres, getMovies, getMoviesByGenre } from '@/lib/cms';
import { MovieCard } from '@/components/MovieCard';
import { Pagination } from '@/components/Pagination';

type Props = {
  searchParams: Promise<{ genre?: string; page?: string }>;
};

export default async function MoviesPage({ searchParams }: Props) {
  const { genre, page: pageParam } = await searchParams;
  const page = Number(pageParam) || 1;
  const pageSize = 20;

  const [genres, { data: movies, meta }] = await Promise.all([
    getGenres(),
    genre
      ? getMoviesByGenre(genre, page, pageSize)
      : getMovies(page, pageSize),
  ]);

  const activeGenre = genres.find((g) => g.slug === genre) ?? null;

  const paginationSearchParams: Record<string, string> = {};
  if (genre) paginationSearchParams.genre = genre;

  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page title */}
      <h1
        style={{ ...bebasStyle, letterSpacing: '0.05em', lineHeight: 1 }}
        className="text-6xl lg:text-8xl text-white mb-10"
      >
        BROWSE FILMS
      </h1>

      {/* Genre filter pills — scrollable row */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide">
        <Link
          href="/movies"
          style={{ ...bebasStyle, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
          className={`px-4 py-1.5 text-sm border transition-colors ${
            !genre
              ? 'bg-[#cc0000] border-[#cc0000] text-white'
              : 'border-[#333] text-[#888888] hover:border-[#cc0000] hover:text-[#e8e8e8]'
          }`}
        >
          ALL
        </Link>
        {genres.map((g) => (
          <Link
            key={g.documentId}
            href={`/movies?genre=${g.slug}`}
            style={{ ...bebasStyle, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}
            className={`px-4 py-1.5 text-sm border transition-colors ${
              genre === g.slug
                ? 'bg-[#cc0000] border-[#cc0000] text-white'
                : 'border-[#333] text-[#888888] hover:border-[#cc0000] hover:text-[#e8e8e8]'
            }`}
          >
            {g.name.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* Active genre label */}
      {activeGenre && (
        <p
          style={{ fontFamily: "'Crimson Pro', serif" }}
          className="text-[#888888] text-lg mb-6"
        >
          Showing films in{' '}
          <span className="text-[#e8e8e8]">{activeGenre.name}</span>
          {meta.total > 0 && ` — ${meta.total} film${meta.total !== 1 ? 's' : ''}`}
        </p>
      )}

      {/* Movie grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movies.map((movie, i) => (
            <MovieCard key={movie.documentId} movie={movie} priority={i < 5} />
          ))}
        </div>
      ) : (
        <div
          style={{ ...bebasStyle, letterSpacing: '0.1em' }}
          className="text-center py-32 text-[#333] text-3xl"
        >
          NO FILMS FOUND
        </div>
      )}

      {/* Pagination */}
      {(meta.hasPrevPage || meta.hasNextPage) && (
        <Pagination
          page={meta.page}
          hasNextPage={meta.hasNextPage}
          hasPrevPage={meta.hasPrevPage}
          basePath="/movies"
          searchParams={paginationSearchParams}
        />
      )}
    </div>
  );
}
