import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'CinemaDB',
  description: 'A dark cinematic film catalog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{ position: 'sticky', top: 0, zIndex: 50 }}
          className="bg-[#080808]/90 backdrop-blur-sm border-b border-[#222]"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/"
              style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' }}
              className="text-3xl text-[#cc0000] hover:text-[#ff1a1a] transition-colors"
            >
              CINEMADB
            </Link>
            <div className="flex items-center gap-8">
              <Link
                href="/movies"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.15em' }}
                className="text-base text-[#e8e8e8] hover:text-[#cc0000] transition-colors relative group"
              >
                BROWSE
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#cc0000] group-hover:w-full transition-all duration-200" />
              </Link>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="border-t border-[#222] mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center">
            <p
              style={{ fontFamily: "'Crimson Pro', serif" }}
              className="text-[#888888] text-sm tracking-widest"
            >
              CINEMADB &middot; {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
