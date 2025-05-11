import { useState } from 'react'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { useModalState } from '../../../../hooks/useModalState.js'
import { CREATE_TIME_ENTRY } from '../../../../services/api/time-entry/mutations.js'
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from '../../../../services/api/employee/queries.js'

export const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')
  const [timeEntriesData, setTimeEntriesData] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const resetErrorMessage = () => setErrorMessage(null)

  const [isLoadingTimeEntriesForm, setIsLoadingTimeEntriesForm] = useState(false)
  const timeEntryFormModalState = useModalState()
  const newTimeEntryFormModalState = useModalState()

  const notificationInfoModalState = useModalState()
  const [openNotification, setOpenNotification] = useState(null)

  const statusClassMap = {
    AFVENTER: 'status-select--pending',
    GODKENDT: 'status-select--approve',
    AFVIST: 'status-select--reject',
    IGANG: 'status-select--underway',
  }

  const statusTranslationKeyMap = {
    AFVENTER: 'pending',
    GODKENDT: 'approve',
    AFVIST: 'reject',
    IGANG: 'underway',
  }

  const timeEntriesColumns = [
    {
      key: 'startDate',
      label: translate('start_date'),
      type: 'number',
      sort: true,
    },
    {
      key: 'startTime',
      label: translate('start_time'),
      type: 'number',
      sort: true,
    },
    {
      key: 'endDate',
      label: translate('end_date'),
      type: 'number',
      sort: true,
    },
    {
      key: 'endTime',
      label: translate('end_time'),
      type: 'number',
      sort: true,
    },
    {
      key: 'duration',
      label: translate('duration'),
      type: 'number',
      sort: true,
    },
    {
      key: 'break',
      label: translate('break'),
      type: 'text',
      sort: true,
    },
    {
      key: 'comment',
      label: translate('comment'),
      type: 'text',
      sort: true,
    },
    {
      key: 'status',
      label: translate('status'),
      type: 'view',

      alwaysEnabled: true,
      view: (timeEntry) => {
        const status = timeEntry.notification?.status || timeEntry.status
        const translationKey = statusTranslationKeyMap[status] || 'underway'

        return (
          <Button
            className={`status-button ${statusClassMap[status] || ''}`}
            onClick={() => {
              setOpenNotification(timeEntry)
              notificationInfoModalState.openModal()
            }}
          >
            {translate(translationKey)}
          </Button>
        )
      },
    },
    {
      key: '',
      label: ``,
      alwaysEnabled: true,
    },
  ]

  const { loading: isLoadingTimeEntries } = useQuery(GET_TIME_ENTRIES_FOR_EMPLOYEE, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setTimeEntriesData(data.employee)
    },
    onError: (error) => {
      console.error('Error fetching timeEntries:', error)
    },
  })

  const [createTimeEntry, { loading: isSubmittingNewTimeEntry }] = useMutation(CREATE_TIME_ENTRY, {
    refetchQueries: [GET_TIME_ENTRIES_FOR_EMPLOYEE],
  })

  const handleSubmitNewTimeEntry = (timeEntry) => {
    setIsLoadingTimeEntriesForm(true)
    setErrorMessage(null)

    createTimeEntry({
      variables: { newTimeEntry: timeEntry },
      onCompleted: () => {
        setIsLoadingTimeEntriesForm(false)
        newTimeEntryFormModalState.closeModal()
      },
      onError: (error) => {
        setIsLoadingTimeEntriesForm(false)

        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          const messages = error.graphQLErrors.map((e) => e.message)
          setErrorMessage(messages.join('\n'))
        } else {
          setErrorMessage('Noget gik galt. Prøv igen.')
        }
      },
    })
  }

  return {
    translate,
    apolloClient,
    timeEntriesData,
    errorMessage,
    resetErrorMessage,
    timeEntriesColumns,
    setTimeEntriesData,
    isLoadingTimeEntries,
    timeEntryFormModalState,
    isLoadingTimeEntriesForm,
    isSubmittingNewTimeEntry,
    handleSubmitNewTimeEntry,
    newTimeEntryFormModalState,
    notificationInfoModalState,
    openNotification,
    setOpenNotification,
    setIsLoadingTimeEntriesForm,
  }
}
