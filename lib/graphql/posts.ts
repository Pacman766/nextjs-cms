export const POSTS_QUERY = `
  query Posts($page: Int!, $pageSize: Int!) {
    posts(
      pagination: { page: $page, pageSize: $pageSize }
      sort: "publishedAt:desc"
    ) {
      documentId
      title
      slug
      content
      createdAt
      publishedAt
      cover {
        url
      }
    }
  }
`;
