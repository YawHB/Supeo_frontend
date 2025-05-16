import { useTranslation } from 'react-i18next'
import { useQuery, useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import { GET_ALL_TIME_ENTRIES } from '../../../../services/api/time-entry/queries.js'
import { UPDATE_TIME_ENTRY_STATUS } from '../../../../services/api/admin/mutations.js'
import exportTableData from '../../../lib/export/exportTableData.js'
import showToast from '../../../lib/toast/toast.js'
import { Input } from 'reactstrap'

const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')
  const [timeEntries, setTimeEntries] = useState([])

  const timeEntriesTableColumns = [
    { key: 'id', label: translate('id'), type: 'text', sort: true },
    { key: 'firstName', label: translate('first_name'), type: 'text', sort: true },
    { key: 'lastName', label: translate('last_name'), type: 'text', sort: true },
    { key: 'startDate', label: translate('date'), type: 'date', sort: true },
    { key: 'startTime', label: translate('start_time'), type: 'text', sort: true },
    { key: 'endDate', label: translate('date'), type: 'date', sort: true },
    { key: 'endTime', label: translate('end_time'), type: 'text', sort: true },
    { key: 'duration', label: translate('duration'), type: 'text', sort: true },
    { key: 'comment', label: translate('comment'), type: 'text', sort: true },
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
      ],
    },
  ]

  const { loading: isLoadingTimeEntries } = useQuery(GET_ALL_TIME_ENTRIES, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => setTimeEntries(data.timeEntries),
  })

  const [updateTimeEntryStatus] = useMutation(UPDATE_TIME_ENTRY_STATUS)

  // const handleStatusChange = (notificationID, notificationStatus) => {
  //   updateTimeEntryStatus({
  //     variables: {
  //       notification: {
  //         notificationID,
  //         status: notificationStatus,
  //       },
  //     },
  //     onCompleted: () => {
  //       refetch().then((result) => {
  //         setTimeEntries(result.data.timeEntries)
  //         // returnerer alle timeEntries
  //         console.log('Time entries:', result.data.timeEntries)
  //       })
  //     },
  //   })
  // }

  const newHandleStatusChange = (newStatus, i) => {
    console.log('Inside new handle status change')
    console.log(newStatus, i)

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
  }

  const handleStatusChange = (notificationID, notificationStatus) => {
    updateTimeEntryStatus({
      variables: {
        notification: {
          notificationID,
          status: notificationStatus,
        },
      },
      onCompleted: (data) => {
        const updatedNotification = data.updateTimeEntryStatus
        console.log('INSIDE TIME_ENTRIES_PAGE_STATE')
        console.log('updatedEntry: ', updatedNotification)
        setTimeEntries(
          (prevEntries) =>
            prevEntries.map((entry) =>
              entry.notification.id === updatedNotification.id
                ? {
                    ...entry,
                    notification: {
                      ...entry.notification,
                      status: updatedNotification.status,
                      comment: updatedNotification.comment,
                    },
                  }
                : entry,
            ),
          console.log('Updated entry:', updatedNotification),
        )
      },
    })
  }

  // const handleStatusChange = async (entryId, newStatus) => {
  //   //console.log('entryId, and newStatus', entryId, newStatus)
  //   const updatedEntries = timeEntries.map((entry) =>
  //     entry.id === entryId ? { ...entry, status: newStatus } : entry,
  //   )
  //   setTimeEntries(updatedEntries)

  //   try {
  //     await updateTimeEntryStatus({
  //       variables: { id: entryId, status: newStatus },
  //     })
  //   } catch (error) {
  //     console.error('Failed to update status:', error)
  //   }
  // }

  const handleExportTable = () => {
    const startMsg = translate('export_table.start')
    showToast(startMsg, 'info')

    apolloClient
      .query({ query: GET_ALL_TIME_ENTRIES, fetchPolicy: 'network-only' })
      .then((result) => {
        const data = result.data?.timeEntries ?? []
        const today = new Date().toISOString().split('T')[0]
        return exportTableData({
          data,
          filename: `${translate(`export_table.time_entries_overview`)} ${today}`,
          columns: timeEntriesTableColumns.filter((col) => col.key !== 'id'),
          //columns: timeEntriesTableColumns,
          strategy: 'xlsx',
        })
      })
      .then(
        () => {
          const successMsg = translate('export_table.success')
          showToast(successMsg, 'success')
        },
        () => {
          const errorMsg = translate('export_table.error')
          showToast(errorMsg, 'error')
        },
      )
  }

  return {
    translate,
    apolloClient,
    isLoadingTimeEntries,
    timeEntriesTableColumns,
    newHandleStatusChange,
    timeEntries,
    handleExportTable,
  }
}

export default useTimeEntriesPageState
