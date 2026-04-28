import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  baseParams: Record<string, string>;
}

function buildPageUrl(params: Record<string, string>, page: number): string {
  const urlParams = new URLSearchParams(params);
  if (page === 1) {
    urlParams.delete('page');
  } else {
    urlParams.set('page', String(page));
  }
  const str = urlParams.toString();
  return str ? `/?${str}` : '/';
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }
  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, '...', current - 1, current, current + 1, '...', total];
}

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  perPage,
  baseParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(currentPage, totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalCount);

  return (
    <div className="mt-12 flex flex-col items-center gap-5">
      {/* Resumen de resultados */}
      <p className="text-nordic-muted text-sm">
        Mostrando{' '}
        <span className="font-semibold text-nordic-dark dark:text-white">
          {startItem}–{endItem}
        </span>{' '}
        de{' '}
        <span className="font-semibold text-nordic-dark dark:text-white">
          {totalCount}
        </span>{' '}
        propiedades
      </p>

      {/* Controles */}
      <nav
        className="flex items-center gap-1"
        aria-label="Paginación"
      >
        {/* Anterior */}
        {hasPrev ? (
          <Link
            href={buildPageUrl(baseParams, currentPage - 1)}
            className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            <span className="material-icons text-base leading-none">chevron_left</span>
            Anterior
          </Link>
        ) : (
          <span className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-nordic-muted/30 cursor-not-allowed rounded-lg select-none">
            <span className="material-icons text-base leading-none">chevron_left</span>
            Anterior
          </span>
        )}

        {/* Números */}
        <div className="flex items-center gap-1 mx-1">
          {pageNumbers.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-9 h-9 flex items-center justify-center text-nordic-muted/60 text-sm select-none"
                >
                  ···
                </span>
              );
            }
            if (p === currentPage) {
              return (
                <span
                  key={p}
                  className="w-9 h-9 flex items-center justify-center text-sm font-bold bg-nordic-dark dark:bg-mosque text-white rounded-lg shadow-sm"
                >
                  {p}
                </span>
              );
            }
            return (
              <Link
                key={p}
                href={buildPageUrl(baseParams, p)}
                className="w-9 h-9 flex items-center justify-center text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-lg transition-all"
              >
                {p}
              </Link>
            );
          })}
        </div>

        {/* Siguiente */}
        {hasNext ? (
          <Link
            href={buildPageUrl(baseParams, currentPage + 1)}
            className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-nordic-muted hover:text-nordic-dark dark:hover:text-white rounded-lg hover:bg-white dark:hover:bg-white/10 transition-all"
          >
            Siguiente
            <span className="material-icons text-base leading-none">chevron_right</span>
          </Link>
        ) : (
          <span className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-nordic-muted/30 cursor-not-allowed rounded-lg select-none">
            Siguiente
            <span className="material-icons text-base leading-none">chevron_right</span>
          </span>
        )}
      </nav>
    </div>
  );
}
