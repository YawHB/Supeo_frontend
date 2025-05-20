import { useState } from 'react'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useModalState } from '../../../hooks/useModalState.js'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { CREATE_TIME_ENTRY, DELETE_TIME_ENTRY } from '../../../services/time-entry/mutations.js'
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from '../../../services/employee/queries.js'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')

  const timeEntryFormModalState = useModalState()
  const notificationInfoModalState = useModalState()

  const resetErrorMessages = () => setErrorMessages(null)

  const [errorMessages, setErrorMessages] = useState(null)
  const [timeEntriesData, setTimeEntriesData] = useState([])
  const [openNotification, setOpenNotification] = useState(null)
  const [isLoadingTimeEntriesForm, setIsLoadingTimeEntriesForm] = useState(false)

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState(null)

  const [timeEntryBeingEdited, setTimeEntryBeingEdited] = useState(null)

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
      key: 'actions',
      label: ``,
      alwaysEnabled: true,
      type: 'view',
      view: (timeEntry) => (
        <div className='d-flex justify-content-between'>
          <Button
            color='primary'
            outline
            onClick={() => {
              setTimeEntryBeingEdited(timeEntry)
              timeEntryFormModalState.openModal(timeEntry)
            }}
          >
            <FontAwesomeIcon icon={faPencil} />
          </Button>

          <Button
            color='danger'
            outline
            onClick={() => {
              setEntryToDelete(timeEntry)
              setDeleteModalOpen(true)
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      ),
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
    onCompleted: (data) => {
      setTimeEntriesData((prev) => ({
        ...prev,
        timeEntries: [...prev.timeEntries, data],
      }))
    },
  })

  const [deleteTimeEntry] = useMutation(DELETE_TIME_ENTRY, {
    onCompleted: ({ deleteTimeEntry }) => {
      setTimeEntriesData((prev) => ({
        ...prev,
        timeEntries: prev.timeEntries.filter((timeEntry) => timeEntry.id !== deleteTimeEntry),
      }))
    },
    onError: (err) => {
      console.error('Failed to delete entry:', err)
    },
  })

  const handleSubmitNewTimeEntry = (timeEntry) => {
    setIsLoadingTimeEntriesForm(true)
    setErrorMessages(null)
    createTimeEntry({
      variables: { newTimeEntry: timeEntry },
      onCompleted: (data) => {
        setTimeEntriesData((prev) => ({
          ...prev,
          timeEntries: [...prev.timeEntries, data.createTimeEntry],
        }))
        setIsLoadingTimeEntriesForm(false)
        timeEntryFormModalState.closeModal()
      },
      onError: (errors) => {
        setIsLoadingTimeEntriesForm(false)
        if (errors.graphQLErrors && errors.graphQLErrors.length > 0) {
          const messages = errors.graphQLErrors.map((e) => e.message)
          setErrorMessages(messages)
        } else {
          setErrorMessages('Noget gik galt. Prøv igen.')
        }
      },
    })
  }

  return {
    translate,
    apolloClient,
    errorMessages,
    timeEntriesData,
    openNotification,
    resetErrorMessages,
    timeEntriesColumns,
    setTimeEntriesData,
    setOpenNotification,
    isLoadingTimeEntries,
    timeEntryFormModalState,
    isLoadingTimeEntriesForm,
    isSubmittingNewTimeEntry,
    handleSubmitNewTimeEntry,
    notificationInfoModalState,
    setIsLoadingTimeEntriesForm,
    deleteTimeEntry,
    deleteModalOpen,
    setDeleteModalOpen,
    entryToDelete,
    setEntryToDelete,
    timeEntryBeingEdited,
    setTimeEntryBeingEdited,
  }
}
