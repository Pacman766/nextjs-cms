import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';

type Props = {
  movie: Movie;
  priority?: boolean;
};

export function MovieCard({ movie, priority = false }: Props) {
  return (
    <Link href={`/movies/${movie.slug}`} className="group block">
      <div className="aspect-[2/3] relative overflow-hidden rounded-sm bg-[#1a1a1a] cursor-pointer">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a1a1a] gap-2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#444]"
            >
              <rect x="2" y="8" width="36" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="8" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="32" cy="14" r="2" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="32" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
              <rect x="13" y="12" width="14" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              className="text-[#444] text-xs tracking-widest"
            >
              NO POSTER
            </span>
          </div>
        )}

        {/* Rating badge */}
        {movie.rating !== null && (
          <div
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            className="absolute top-2 right-2 bg-[#cc0000] text-white text-sm px-2 py-0.5 z-10"
          >
            &#9733; {movie.rating.toFixed(1)}
          </div>
        )}

        {/* Hover overlay — slides up */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col justify-end p-3 z-10">
          <h3
            style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: 1.1 }}
            className="text-white text-xl leading-tight mb-1"
          >
            {movie.title}
          </h3>
          <div className="flex items-center gap-3 text-[#888888] text-xs">
            {movie.year && <span>{movie.year}</span>}
            {movie.rating !== null && (
              <span className="text-[#cc0000]">&#9733; {movie.rating.toFixed(1)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
