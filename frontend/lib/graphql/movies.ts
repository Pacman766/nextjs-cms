const MOVIE_FIELDS = `
  documentId
  title
  slug
  poster {
    url
  }
  description
  year
  rating
  duration
  featured
  genres {
    documentId
    name
    slug
  }
  publishedAt
`;

export const FEATURED_MOVIE_QUERY = `
  query FeaturedMovie {
    movies(filters: { featured: { eq: true } }, pagination: { page: 1, pageSize: 1 }) {
      ${MOVIE_FIELDS}
    }
  }
`;

export const MOVIES_QUERY = `
  query Movies($page: Int!, $pageSize: Int!) {
    movies_connection(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "publishedAt:desc"
    ) {
      nodes {
        ${MOVIE_FIELDS}
      }
      pageInfo {
        page
        pageSize
        pageCount
        total
      }
    }
  }
`;

export const MOVIE_BY_SLUG_QUERY = `
  query MovieBySlug($slug: String!) {
    movies(filters: { slug: { eq: $slug } }, pagination: { page: 1, pageSize: 1 }) {
      ${MOVIE_FIELDS}
    }
  }
`;

export const GENRES_QUERY = `
  query Genres {
    genres {
      documentId
      name
      slug
    }
  }
`;

export const MOVIES_BY_GENRE_QUERY = `
  query MoviesByGenre($genreSlug: String!, $page: Int!, $pageSize: Int!) {
    movies_connection(
      filters: { genres: { slug: { eq: $genreSlug } } }
      pagination: { page: $page, pageSize: $pageSize }
      sort: "publishedAt:desc"
    ) {
      nodes {
        ${MOVIE_FIELDS}
      }
      pageInfo {
        page
        pageSize
        pageCount
        total
      }
    }
  }
`;
