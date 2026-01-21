export type Post = {
  documentId: string;
  title: string;
  slug: string | null;
  content: any;
  createdAt: string;
  publishedAt: string | null;
  coverUrl: string | null;
};


export type PostResponse = {
	data: Post[];
};
