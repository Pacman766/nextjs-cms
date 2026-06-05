import Image from 'next/image';
import Link from 'next/link';
import { getFeaturedMovie, getMovies } from '@/lib/cms';
import { MovieCard } from '@/components/MovieCard';

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default async function HomePage() {
  const [featured, { data: movies }] = await Promise.all([
    getFeaturedMovie(),
    getMovies(1, 8),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-screen overflow-hidden flex items-center">
        {/* Blurred background poster */}
        {featured?.posterUrl ? (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={featured.posterUrl}
                alt={featured.title}
                fill
                priority
                sizes="100vw"
                className="object-cover blur-2xl scale-110 opacity-40"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-[#080808]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#080808]" />
        )}

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {featured ? (
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Text — left */}
              <div className="flex-1 order-2 lg:order-1">
                {/* Genre pills */}
                {featured.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featured.genres.map((g) => (
                      <span
                        key={g.documentId}
                        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
                        className="text-xs text-[#cc0000] border border-[#cc0000] px-3 py-0.5"
                      >
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                <h1
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    lineHeight: 0.9,
                    letterSpacing: '0.02em',
                  }}
                  className="text-7xl lg:text-9xl text-white mb-6"
                >
                  {featured.title}
                </h1>

                {/* Metadata row */}
                <div className="flex items-center gap-4 mb-6">
                  {featured.year && (
                    <span
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className="text-lg text-[#888888] tracking-widest"
                    >
                      {featured.year}
                    </span>
                  )}
                  {featured.duration !== null && (
                    <span
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className="text-lg text-[#888888] tracking-widest"
                    >
                      {formatDuration(featured.duration)}
                    </span>
                  )}
                  {featured.rating !== null && (
                    <span
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      className="text-lg text-[#cc0000] tracking-widest"
                    >
                      &#9733; {featured.rating.toFixed(1)}
                    </span>
                  )}
                </div>

                {featured.description && (
                  <p
                    style={{ fontFamily: "'Crimson Pro', serif" }}
                    className="text-[#888888] text-xl leading-relaxed mb-10 line-clamp-2 max-w-xl"
                  >
                    {featured.description}
                  </p>
                )}

                <Link
                  href={`/movies/${featured.slug}`}
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
                  className="inline-block bg-[#cc0000] hover:bg-[#ff1a1a] text-white text-xl px-10 py-3 transition-colors"
                >
                  VIEW FILM &rarr;
                </Link>
              </div>

              {/* Poster — right */}
              {featured.posterUrl && (
                <div className="order-1 lg:order-2 flex-shrink-0">
                  <div
                    className="relative w-56 sm:w-72 lg:w-80 shadow-2xl"
                    style={{ aspectRatio: '2/3', transform: 'rotate(1deg)' }}
                  >
                    <Image
                      src={featured.posterUrl}
                      alt={featured.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 288px, 320px"
                      className="object-cover rounded-sm"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* No featured movie placeholder */
            <div className="text-center py-32">
              <h1
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
                className="text-8xl text-[#222] mb-4"
              >
                COMING SOON
              </h1>
              <p
                style={{ fontFamily: "'Crimson Pro', serif" }}
                className="text-[#444] text-xl"
              >
                No featured film selected.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Films Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-baseline justify-between mb-10">
          <h2
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.05em' }}
            className="text-4xl text-white border-l-4 border-[#cc0000] pl-4"
          >
            POPULAR FILMS
          </h2>
          <Link
            href="/movies"
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            className="text-base text-[#cc0000] hover:text-[#ff1a1a] transition-colors"
          >
            VIEW ALL FILMS &rarr;
          </Link>
        </div>

        {movies.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie, i) => (
              <MovieCard key={movie.documentId} movie={movie} priority={i < 4} />
            ))}
          </div>
        ) : (
          <div
            style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
            className="text-center py-20 text-[#333] text-2xl"
          >
            NO FILMS AVAILABLE YET
          </div>
        )}
      </section>
    </>
  );
}
