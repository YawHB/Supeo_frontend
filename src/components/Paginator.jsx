import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

const Paginator = ({ paginationState, onPageChange, onPerPageChange, perPageOptions, totalPages }) => {
  const { page, perPage } = paginationState

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className='paginator d-flex align-items-center gap-1'>
      <select
        className='per-page-select'
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
        style={{
          width: perPage >= 100 ? '69px' : '60px',
        }}
      >
        {perPageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <button
        className='btn-paginator'
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        aria-label='First page'
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>

      <button
        className='btn-paginator'
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        aria-label='Previous page'
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`page-number ${pageNumber === page ? 'active' : ''}`}
          onClick={() => onPageChange(pageNumber)}
          aria-current={pageNumber === page ? 'page' : undefined}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className='btn-paginator'
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        aria-label='Next page'
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>

      <button
        className='btn-paginator'
        onClick={() => onPageChange(totalPages)}
        disabled={page === totalPages}
        aria-label='Last page'
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  )
}

export default Paginator
