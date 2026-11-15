'use client';

interface PaginatorProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Paginator = ({ page, lastPage, onPageChange }: PaginatorProps) => {
  return (
    <nav>
      <ul className="pagination">
        <li className={page === 1 ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            type="button"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
          >
            Previous
          </button>
        </li>
        <li className={page === lastPage ? 'page-item disabled' : 'page-item'}>
          <button
            className="page-link"
            type="button"
            onClick={() => onPageChange(page + 1)}
            disabled={page === lastPage}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Paginator;
