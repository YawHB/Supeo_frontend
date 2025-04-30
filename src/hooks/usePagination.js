import { useState, useMemo, useCallback } from "react";

const usePagination = (
  initialPage = 1,
  initialPerPage = 25,
  pageSizeOptions = [10, 25, 50, 100]
) => {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPage] = useState(initialPerPage);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = useMemo(() => Math.ceil(totalCount / perPage), [totalCount, perPage]);

  const variables = useMemo(() => ({ page, perPage }), [page, perPage]);

  const goToPage = useCallback((p) => setPage(Math.max(1, Math.min(p, totalPages))), [totalPages]);

  const changePerPage = useCallback((newPerPage) => {
    setPerPage(newPerPage);
    setPage(1);
  }, []);

  return {
    page,
    perPage,
    totalCount,
    totalPages,
    pageSizeOptions,
    variables,
    goToPage,
    changePerPage,
    setTotalCount,
  };
};

export default usePagination;
