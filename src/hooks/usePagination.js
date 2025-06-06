import { useState, useMemo } from 'react'

const usePagination = (initialState = { page: 1, perPage: 10 }, perPageOptions = [10, 25, 50, 100]) => {
  const [pagination, setPagination] = useState(initialState)
  const [totalCount, setTotalCount] = useState(0)

  const totalPages = useMemo(() => {
    return totalCount > 0 ? Math.ceil(totalCount / pagination.perPage) : 1
  }, [totalCount, pagination.perPage])

  const clampPage = (page) => {
    if (totalPages < 1) return 1
    return Math.min(Math.max(page, 1), totalPages)
  }

  const setPage = (page) => {
    setPagination((prev) => ({ ...prev, page: clampPage(page) }))
  }

  const setPerPage = (perPage) => {
    setPagination((prev) => ({ ...prev, perPage, page: 1 }))
  }

  return {
    state: pagination,
    setPage,
    setPerPage,
    perPageOptions,
    totalCount,
    setTotalCount,
    totalPages,
  }
}

export default usePagination
