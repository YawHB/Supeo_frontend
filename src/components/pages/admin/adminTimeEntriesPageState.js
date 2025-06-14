import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Input } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import showToast from '../../../utils/toast.js'
import exportTableData from '../../../utils/exportTableData.js'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import { GET_ALL_TIME_ENTRIES } from '../../../services/time-entry/queries.js'
import { UPDATE_TIME_ENTRY_STATUS } from '../../../services/notification/mutations.js'
import { calculateDurationMinutes } from '../../../utils/calculateWorkHours.js'
import { useDebouncedInput } from '../../../hooks/useDebouncedInput.js'
import { handleMemberAuthError } from '../../../utils/errorHandling.js'
import useSort from '../../../hooks/useSort.js'
import { GET_ALL_FILTERED_TIME_ENTRIES } from '../../../services/time-entry/queries.js'

const useTimeEntriesPageState = () => {
  const navigate = useNavigate()

  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')
  const [timeEntries, setTimeEntries] = useState([])
  const [editingRowIndex, setEditingRowIndex] = useState(null)
  const { orderBy, orderDirection, sort, sortIcon } = useSort('id', 'ASC')
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  })

  const searchInput = useDebouncedInput('', 300)

  const timeEntrySortMapping = {
    id: 'id',
    firstName: 'first_name',
    lastName: 'last_name',
    startDate: 'start_date',
    endDate: 'end_date',
    startTime: 'start_time',
    endTime: 'end_time',
    duration: 'duration',
    comment: 'comment',
    adminComment: 'notification.admin_comment',
  }

  const timeEntriesTableColumns = [
    { key: 'id', label: translate('id'), type: 'text', sort: true },
    { key: 'firstName', label: translate('first_name'), type: 'text', sort: true },
    { key: 'lastName', label: translate('last_name'), type: 'text', sort: true },
    { key: 'startDate', label: translate('start_date'), type: 'date', sort: true },
    { key: 'startTime', label: translate('start_time'), type: 'text', sort: true },
    { key: 'endDate', label: translate('end_date'), type: 'date', sort: true },
    { key: 'endTime', label: translate('end_time'), type: 'text', sort: true },
    { key: 'duration', label: translate('duration'), type: 'text', sort: true },
    { key: 'comment', label: translate('employee_comment'), type: 'text', sort: true },
    {
      key: 'adminComment',
      label: translate('admin_comment'),
      type: `textarea`,
      alwaysEnabled: true,
      sort: true,
      view: (input) => (
        <Input
          id='comment'
          name='comment'
          type='text'
          value={input.comment.value}
          onChange={input.comment.onChange}
        />
      ),
    },
    {
      key: 'status',
      label: translate('status'),
      type: 'select',
      options: [
        { label: translate('pending'), value: 'AFVENTER' },
        { label: translate('approve'), value: 'GODKENDT' },
        { label: translate('reject'), value: 'AFVIST' },
        { label: translate('underway'), value: 'IGANG' },
      ],
    },
  ]

  const { loading: isLoadingTimeEntries } = useQuery(GET_ALL_TIME_ENTRIES, {
    variables: {
      search: searchInput.debouncedValue || null,
      sort: {
        orderBy: timeEntrySortMapping[orderBy],
        orderDirection: orderDirection,
      },
    },
    fetchPolicy: 'cache-first',
    onCompleted: (data) => setTimeEntries(data.timeEntries),
    onError: (errors) => handleMemberAuthError(errors, navigate),
    skip: filters.startDate || filters.endDate,
  })

  const { loading: isLoadingFilteredTimeEntries } = useQuery(GET_ALL_FILTERED_TIME_ENTRIES, {
    variables: {
      filter: {
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    },
    fetchPolicy: 'cache-first',
    onCompleted: (data) => setTimeEntries(data.filteredTimeEntries),
    skip: !(filters.startDate || filters.endDate),
  })

  const [updateTimeEntryStatus] = useMutation(UPDATE_TIME_ENTRY_STATUS)

  const handleStatusChange = (newStatus, i, notificationID) => {
    updateTimeEntryStatus({
      variables: {
        notification: {
          notificationID,
          status: newStatus,
          comment: timeEntries[i].notification.comment,
          timestamp: Date.now(),
        },
      },
      onCompleted: () => {
        setTimeEntries((prev) => {
          const newTimeEntries = [...prev]
          newTimeEntries[i] = {
            ...newTimeEntries[i],
            notification: {
              ...newTimeEntries[i].notification,
              status: newStatus,
            },
          }
          return newTimeEntries
        })

        const { firstName, lastName } = timeEntries[i].employee

        if (newStatus === 'GODKENDT') {
          showToast(
            translate('notification.time_entry.approve.success', {
              firstName,
              lastName,
            }),
            'success',
          )
        } else if (newStatus === 'AFVIST') {
          showToast(
            translate('notification.time_entry.reject.success', {
              firstName,
              lastName,
            }),
            'success',
          )
        }
      },
    })
  }
  
  

  const handleInputFieldClick = (i) => {
    setEditingRowIndex(i)
  }

  const handleCommentChange = (newComment, i) => {
    setTimeEntries((prev) => {
      const newTimeEntries = [...prev]
      newTimeEntries[i] = {
        ...newTimeEntries[i],
        notification: {
          ...newTimeEntries[i].notification,
          comment: newComment,
        },
      }
      return newTimeEntries
    })
  }

  const handleUpdateComment = (key, i, notificationID) => {
    if (key === 'Enter') {
      setEditingRowIndex(null)
      updateTimeEntryStatus({
        variables: {
          notification: {
            notificationID,
            comment: timeEntries[i].notification.comment,
            status: timeEntries[i].notification.status,
            timestamp: Date.now(),
          },
        },
      })
    }
  }

  const handleExportTable = () => {
    showToast(translate('export_table.start'), 'info')
    const tableToExport = timeEntries
      .filter((timeEntry) => timeEntry.notification?.status !== 'IGANG')
      .map((timeEntry) => ({
        id: timeEntry.id,
        firstName: timeEntry.employee?.firstName,
        lastName: timeEntry.employee?.lastName,
        startDate: timeEntry.startDate,
        startTime: timeEntry.startTime,
        endDate: timeEntry.endDate,
        endTime: timeEntry.endTime,
        duration: calculateDurationMinutes(
          timeEntry.startDate,
          timeEntry.startTime,
          timeEntry.endDate,
          timeEntry.endTime,
        ),
        comment: timeEntry.comment,
        adminComment: timeEntry.notification?.comment ?? '',
        status: timeEntry.notification?.status ?? '',
      }))

    const today = new Date().toISOString().split('T')[0]


    try {
      exportTableData({
        data: tableToExport,
        filename: `${translate('export_table.time_entries_overview')} ${today}`,
        columns: timeEntriesTableColumns.filter((col) => col.key !== 'id'),
        strategy: 'xlsx',
      })
      showToast(translate('export_table.success'), 'success')
    } catch {
      showToast(translate('export_table.error'), 'error')
    }
  }

  return {
    translate,
    timeEntries,
    apolloClient,
    handleExportTable,
    handleStatusChange,
    handleInputFieldClick,
    handleCommentChange,
    handleUpdateComment,
    isLoadingTimeEntries,
    timeEntriesTableColumns,
    editingRowIndex,
    setEditingRowIndex,
    searchInput,
    orderBy,
    orderDirection,
    sort,
    sortIcon,
    isLoadingFilteredTimeEntries,
    filters,
    setFilters,
  }
}

export default useTimeEntriesPageState
