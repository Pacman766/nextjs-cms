import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMovieBySlug } from '@/lib/cms';

type Props = {
  params: Promise<{ slug: string }>;
};

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default async function MovieDetailPage({ params }: Props) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) notFound();

  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const crimsonStyle = { fontFamily: "'Crimson Pro', serif" };

  return (
    <>
      {/* Hero with blurred poster bg */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '60vh' }}>
        {movie.posterUrl && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={movie.posterUrl}
                alt={movie.title}
                fill
                priority
                sizes="100vw"
                className="object-cover blur-2xl scale-110 opacity-30"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/85 to-[#080808]/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          </>
        )}
        {!movie.posterUrl && (
          <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#080808]" />
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back link */}
          <Link
            href="/movies"
            style={{ ...bebasStyle, letterSpacing: '0.1em' }}
            className="inline-block text-[#888888] hover:text-[#cc0000] transition-colors text-base mb-10"
          >
            &larr; BACK
          </Link>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
            {/* Poster */}
            <div className="flex-shrink-0">
              <div
                className="relative w-48 sm:w-64 shadow-2xl rounded-sm overflow-hidden"
                style={{ aspectRatio: '2/3' }}
              >
                {movie.posterUrl ? (
                  <Image
                    src={movie.posterUrl}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 640px) 192px, 256px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1a1a1a]">
                    <span
                      style={{ ...bebasStyle, letterSpacing: '0.1em' }}
                      className="text-[#333] text-sm"
                    >
                      NO POSTER
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1
                style={{ ...bebasStyle, lineHeight: 0.9, letterSpacing: '0.02em' }}
                className="text-5xl lg:text-6xl text-white mb-6"
              >
                {movie.title}
              </h1>

              {/* Metadata row */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                {movie.year && (
                  <span
                    style={{ ...bebasStyle, letterSpacing: '0.1em' }}
                    className="text-lg text-[#888888]"
                  >
                    {movie.year}
                  </span>
                )}
                {movie.duration !== null && (
                  <>
                    <span className="text-[#333]">&middot;</span>
                    <span
                      style={{ ...bebasStyle, letterSpacing: '0.1em' }}
                      className="text-lg text-[#888888]"
                    >
                      {formatDuration(movie.duration)}
                    </span>
                  </>
                )}
                {movie.rating !== null && (
                  <>
                    <span className="text-[#333]">&middot;</span>
                    <span
                      style={{ ...bebasStyle, letterSpacing: '0.1em' }}
                      className="text-lg text-[#cc0000]"
                    >
                      &#9733; {movie.rating.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              {/* Genre pills */}
              {movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {movie.genres.map((g) => (
                    <Link
                      key={g.documentId}
                      href={`/movies?genre=${g.slug}`}
                      style={{ ...bebasStyle, letterSpacing: '0.08em' }}
                      className="text-xs text-[#cc0000] border border-[#cc0000] px-3 py-0.5 hover:bg-[#cc0000] hover:text-white transition-colors"
                    >
                      {g.name.toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}

              <hr className="border-[#222] mb-8" />

              {/* Description */}
              {movie.description ? (
                <p
                  style={{ ...crimsonStyle }}
                  className="text-lg text-[#888888] leading-relaxed max-w-2xl"
                >
                  {movie.description}
                </p>
              ) : (
                <p
                  style={{ ...crimsonStyle }}
                  className="text-lg text-[#444] italic"
                >
                  No description available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
