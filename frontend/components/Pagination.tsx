import Link from 'next/link';

type Props = {
  page: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  basePath: string;
  searchParams?: Record<string, string>;
};

function buildHref(basePath: string, page: number, searchParams: Record<string, string>) {
  const params = new URLSearchParams({ ...searchParams, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

export function Pagination({
  page,
  hasNextPage,
  hasPrevPage,
  basePath,
  searchParams = {},
}: Props) {
  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.1em' };

  return (
    <div className="flex justify-between items-center mt-12">
      {hasPrevPage ? (
        <Link
          href={buildHref(basePath, page - 1, searchParams)}
          style={bebasStyle}
          className="px-6 py-2 border border-[#222] text-[#888888] text-base hover:border-[#cc0000] hover:text-[#e8e8e8] transition-colors"
        >
          &larr; PREV
        </Link>
      ) : (
        <span />
      )}

      <span
        style={bebasStyle}
        className="text-[#444] text-sm tracking-widest"
      >
        PAGE {page}
      </span>

      {hasNextPage ? (
        <Link
          href={buildHref(basePath, page + 1, searchParams)}
          style={bebasStyle}
          className="px-6 py-2 border border-[#222] text-[#888888] text-base hover:border-[#cc0000] hover:text-[#e8e8e8] transition-colors"
        >
          NEXT &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
