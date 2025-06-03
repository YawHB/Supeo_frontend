import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from '@fortawesome/free-solid-svg-icons'

const Paginator = ({ paginationState, onPageChange, onPerPageChange, perPageOptions, totalPages }) => {
  const { page, perPage } = paginationState

  return (
    <div className='paginator d-flex align-items-center gap-3'>
      <select
        className='per-page-select'
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
      >
        {perPageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt} per page
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
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label='Previous page'
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      <button className='page-number'>{page}</button>

      <button
        className='btn-paginator'
        onClick={() => onPageChange(page + 1)}
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
