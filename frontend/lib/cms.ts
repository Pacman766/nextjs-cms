import { fetchGraphQL } from './graphql/fetcher';
import {
  FEATURED_MOVIE_QUERY,
  MOVIES_QUERY,
  MOVIE_BY_SLUG_QUERY,
  GENRES_QUERY,
  MOVIES_BY_GENRE_QUERY,
} from './graphql/movies';
import { getStrapiMedia } from './utils';
import type { Movie, Genre, PaginationMeta } from './types';

type RawGenre = {
  documentId: string;
  name: string;
  slug: string;
};

type RawMovie = {
  documentId: string;
  title: string;
  slug: string;
  poster: { url: string } | null;
  description: string | null;
  year: number | null;
  rating: number | null;
  duration: number | null;
  featured: boolean;
  genres: RawGenre[];
  publishedAt: string | null;
};

type RawPageInfo = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

type RawMoviesConnection = {
  nodes: RawMovie[];
  pageInfo: RawPageInfo;
};

function mapMovie(raw: RawMovie): Movie {
  return {
    documentId: raw.documentId,
    title: raw.title,
    slug: raw.slug,
    posterUrl: getStrapiMedia(raw.poster?.url ?? null),
    description: raw.description,
    year: raw.year,
    rating: raw.rating,
    duration: raw.duration,
    featured: raw.featured,
    genres: raw.genres ?? [],
    publishedAt: raw.publishedAt,
  };
}

function buildMeta(pageInfo: RawPageInfo): PaginationMeta {
  return {
    page: pageInfo.page,
    pageSize: pageInfo.pageSize,
    pageCount: pageInfo.pageCount,
    total: pageInfo.total,
    hasPrevPage: pageInfo.page > 1,
    hasNextPage: pageInfo.page < pageInfo.pageCount,
  };
}

export async function getFeaturedMovie(): Promise<Movie | null> {
  try {
    const data = await fetchGraphQL<{ movies: RawMovie[] }>(FEATURED_MOVIE_QUERY);
    const movie = data.movies?.[0];
    return movie ? mapMovie(movie) : null;
  } catch {
    return null;
  }
}

export async function getMovies(
  page: number = 1,
  pageSize: number = 12
): Promise<{ data: Movie[]; meta: PaginationMeta }> {
  try {
    const data = await fetchGraphQL<{ movies_connection: RawMoviesConnection }>(MOVIES_QUERY, {
      page,
      pageSize,
    });
    const connection = data.movies_connection;
    const movies = (connection?.nodes ?? []).map(mapMovie);
    const pageInfo = connection?.pageInfo ?? { page, pageSize, pageCount: 1, total: movies.length };
    return { data: movies, meta: buildMeta(pageInfo) };
  } catch {
    return {
      data: [],
      meta: { page, pageSize, pageCount: 0, total: 0, hasPrevPage: false, hasNextPage: false },
    };
  }
}

export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  try {
    const data = await fetchGraphQL<{ movies: RawMovie[] }>(MOVIE_BY_SLUG_QUERY, { slug });
    const movie = data.movies?.[0];
    return movie ? mapMovie(movie) : null;
  } catch {
    return null;
  }
}

export async function getGenres(): Promise<Genre[]> {
  try {
    const data = await fetchGraphQL<{ genres: RawGenre[] }>(GENRES_QUERY);
    return data.genres ?? [];
  } catch {
    return [];
  }
}

export async function getMoviesByGenre(
  genreSlug: string,
  page: number = 1,
  pageSize: number = 12
): Promise<{ data: Movie[]; meta: PaginationMeta }> {
  try {
    const data = await fetchGraphQL<{ movies_connection: RawMoviesConnection }>(
      MOVIES_BY_GENRE_QUERY,
      { genreSlug, page, pageSize }
    );
    const connection = data.movies_connection;
    const movies = (connection?.nodes ?? []).map(mapMovie);
    const pageInfo = connection?.pageInfo ?? { page, pageSize, pageCount: 1, total: movies.length };
    return { data: movies, meta: buildMeta(pageInfo) };
  } catch {
    return {
      data: [],
      meta: { page, pageSize, pageCount: 0, total: 0, hasPrevPage: false, hasNextPage: false },
    };
  }
}
