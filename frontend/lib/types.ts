export type Genre = {
  documentId: string;
  name: string;
  slug: string;
};

export type Movie = {
  documentId: string;
  title: string;
  slug: string;
  posterUrl: string | null;
  description: string | null;
  year: number | null;
  rating: number | null;
  duration: number | null;
  featured: boolean;
  genres: Genre[];
  publishedAt: string | null;
};

export type PaginationMeta = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};
