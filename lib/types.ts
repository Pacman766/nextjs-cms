export type Post = {
	id: number;
	attributes: {
		title: string;
		slug: string;
		excerpt?: string;
		content: string;
		publishedAt: string;
	};
};

export type PostResponse = {
	data: Post[];
};
