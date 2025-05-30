const Paginator = ({ paginationState, onPageChange, onPerPageChange, perPageOptions }) => {
  const { page, perPage } = paginationState

  return (
    <div className='d-flex align-items-center gap-3'>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <span>Page {page}</span>
      <button onClick={() => onPageChange(page + 1)}>Next</button>
      <select value={perPage} onChange={(e) => onPerPageChange(Number(e.target.value))}>
        {perPageOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt} per page
          </option>
        ))}
      </select>
    </div>
  )
}

export default Paginator
