import { useState } from 'react'
import { Input } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import showToast from '../../../utils/toast.js'
import exportTableData from '../../../utils/exportTableData.js'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import { GET_ALL_TIME_ENTRIES } from '../../../services/time-entry/queries.js'
import { UPDATE_TIME_ENTRY_STATUS } from '../../../services/notification/mutations.js'
import { calculateWorkDurationInMinutes } from '../../../utils/calculateWorkHours.js'
import { useDebouncedInput } from '../../../hooks/useDebouncedInput.js'

const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')
  const [timeEntries, setTimeEntries] = useState([])
  const [editingRowIndex, setEditingRowIndex] = useState(null)

  const searchInput = useDebouncedInput('', 300)

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
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setTimeEntries(data.timeEntries),
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
    apolloClient
      .query({ query: GET_ALL_TIME_ENTRIES, fetchPolicy: 'network-only' })
      .then((result) => {
        const data = (result.data?.timeEntries ?? [])
          .filter((timeEntry) => timeEntry.notification?.status === 'GODKENDT')
          .map((timeEntry) => ({
            id: timeEntry.id,
            firstName: timeEntry.employee?.firstName,
            lastName: timeEntry.employee?.lastName,
            startDate: timeEntry.startDate,
            startTime: timeEntry.startTime,
            endDate: timeEntry.endDate,
            endTime: timeEntry.endTime,
            duration: calculateWorkDurationInMinutes(
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
        return exportTableData({
          data,
          filename: `${translate('export_table.time_entries_overview')} ${today}`,
          columns: timeEntriesTableColumns.filter((col) => col.key !== 'id'),
          strategy: 'xlsx',
        })
      })
      .then(
        () => showToast(translate('export_table.success'), 'success'),
        () => showToast(translate('export_table.error'), 'error'),
      )
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
  }
}

export default useTimeEntriesPageState
