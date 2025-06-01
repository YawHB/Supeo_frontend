import { useState } from 'react'

const usePagination = (initialState = { page: 1, perPage: 10 }, perPageOptions = [10, 25, 50, 100]) => {
  const [pagination, setPagination] = useState(initialState)

  const setPage = (page) => setPagination((prev) => ({ ...prev, page }))
  const setPerPage = (perPage) =>
    setPagination((prev) => ({
      ...prev,
      page: 1,
      perPage,
    }))

  return {
    state: pagination,
    setPage,
    setPerPage,
    perPageOptions,
  }
}

export default usePagination
