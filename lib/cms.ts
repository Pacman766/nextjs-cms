const CMS_URL = process.env.CMS_URL;

if (!CMS_URL) {
	throw new Error('CMS_URL is not defined in environment variables');
}

export async function getPosts() {
	const res = await fetch(`${CMS_URL}/api/posts?populate=*`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error('Failed to fetch posts');
	}

	return res.json();
}
