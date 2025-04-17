import './pagination.css';

type Props = {
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
};

const Pagination = ({ currentPage, totalCount, onPageChange, itemsPerPage = 5 }: Props) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  if (pageCount <= 1) return null;

  console.log('📟 PAGINATION props:', currentPage, totalCount, itemsPerPage);

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {Array.from({ length: pageCount }, (_, i) => {
        const pageNum = i + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`pagination__number ${
              currentPage === pageNum ? 'pagination__number--active' : ''
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
