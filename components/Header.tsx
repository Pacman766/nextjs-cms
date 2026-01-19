import Link from 'next/link';

export function Header() {
	return (
		<header>
			<nav>
				<Link className="p-2 font-bold hover:underline" href="/">
					Home
				</Link>
				|
				<Link className="p-2 font-bold hover:underline" href="/posts">
					Posts
				</Link>
				|
				<Link className="p-2 font-bold hover:underline" href="/about">
					About
				</Link>
			</nav>
		</header>
	);
}
