export type Post = {
  id: number;
  title: string;
  slug: string;
};


export type PostResponse = {
	data: Post[];
};
