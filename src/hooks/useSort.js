import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faSort } from '@fortawesome/free-solid-svg-icons'

const useSort = (initialOrderBy = 'id', initialOrderDirection = 'ASC') => {
  const [orderBy, setOrderBy] = useState(initialOrderBy)
  const [orderDirection, setOrderDirection] = useState(initialOrderDirection)

  const neutralSortIcon = () => <FontAwesomeIcon icon={faSort} className='ms-1 text-muted' />
  const ascendingSortIcon = () => <FontAwesomeIcon icon={faCaretUp} className='ms-1' />
  const descendingSortIcon = () => <FontAwesomeIcon icon={faCaretDown} className='ms-1' />

  const sortIcon = (columnKey) => {
    if (columnKey !== orderBy) return neutralSortIcon()
    return orderDirection === 'ASC' ? ascendingSortIcon() : descendingSortIcon()
  }

  const sort = (columnKey) => {
    if (orderBy === columnKey) {
      setOrderDirection(orderDirection === 'ASC' ? 'DESC' : 'ASC')
    } else {
      setOrderBy(columnKey)
      setOrderDirection('ASC')
    }
  }

  return { orderBy, orderDirection, sort, sortIcon }
}

export default useSort
