import { Header } from '@/components/Header';
import './globals.css'; // Путь должен быть верным

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<Header />
				{children}
			</body>
		</html>
	);
}
