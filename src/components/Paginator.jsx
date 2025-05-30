import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

const Paginator = ({ page, perPage, totalCount, perPageOptions, onPageChange, onPerPageChange }) => {
  const totalPages = Math.ceil(totalCount / perPage) || 1
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleFirst = () => onPageChange(1)
  const handlePrev = () => onPageChange(Math.max(1, page - 1))
  const handleNext = () => onPageChange(Math.min(totalPages, page + 1))
  const handleLast = () => onPageChange(totalPages)

  return (
    <div className='custom-paginator d-flex justify-content-center'>
      <div className='d-flex align-items-center gap-2'>
        <select
          className='per-page-select'
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
        >
          {perPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div className='pagination-wrapper'>
          <Pagination aria-label='Page navigation'>
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                first
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handleFirst()
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={page === 1}>
              <PaginationLink
                previous
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handlePrev()
                }}
              />
            </PaginationItem>
            {pages.map((p) => (
              <PaginationItem active={p === page} key={p}>
                <PaginationLink
                  href='#'
                  onClick={(e) => {
                    e.preventDefault()
                    onPageChange(p)
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem disabled={page === totalPages}>
              <PaginationLink
                next
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handleNext()
                }}
              />
            </PaginationItem>
            <PaginationItem disabled={page === totalPages}>
              <PaginationLink
                last
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  handleLast()
                }}
              />
            </PaginationItem>
          </Pagination>
        </div>
      </div>
    </div>
  )
}

export default Paginator
