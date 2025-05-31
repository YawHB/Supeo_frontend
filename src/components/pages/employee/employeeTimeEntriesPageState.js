import { useState } from 'react'
import { Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { useModalState } from '../../../hooks/useModalState.js'
import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import {
  CREATE_TIME_ENTRY,
  DELETE_TIME_ENTRY,
  UPDATE_TIME_ENTRY,
} from '../../../services/time-entry/mutations.js'
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from '../../../services/employee/queries.js'
import { faTrashCan, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHourglassHalf,
  faCheckCircle,
  faTimesCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../context/authContext.js'
import { useContext } from 'react'

export const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()
  const [translate] = useTranslation('global')
  const { user } = useContext(AuthContext)

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

  const statusIconMap = {
    AFVENTER: faClock,
    GODKENDT: faCheckCircle,
    AFVIST: faTimesCircle,
    IGANG: faHourglassHalf,
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
        const status = timeEntry.notification?.status
        const icon = statusIconMap[status]

        return (
          <Button
            className={`status-button ${statusClassMap[status] || ''}`}
            onClick={() => {
              setOpenNotification(timeEntry)
              notificationInfoModalState.openModal()
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        )
      },
    },
    {
      key: 'actions',
      label: ``,
      alwaysEnabled: true,
      type: 'view',
      view: (timeEntry) => {
        const isDisabled = timeEntry.notification.status === 'GODKENDT'
        return (
          <div className='d-flex justify-content-end gap-2'>
            <Button
              key={`actions-edit-btn`}
              disabled={isDisabled}
              color='primary'
              outline
              onClick={() => {
                setTimeEntryBeingEdited(timeEntry)
                timeEntryFormModalState.openModal()
              }}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>

            <Button
              key={`actions-delete-btn`}
              disabled={isDisabled}
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
        )
      },
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
    variables: { id: user.employee_id },
  })

  const [createTimeEntry, { loading: isSubmittingNewTimeEntry }] = useMutation(CREATE_TIME_ENTRY, {
    onCompleted: (data) => {
      const createdTimeEntry = data.createTimeEntry
      setTimeEntriesData((prev) => ({
        ...prev,
        timeEntries: [...prev.timeEntries, createdTimeEntry],
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
        setErrorMessages(['Noget gik galt. Prøv igen.'])
      }
    },
  })

  const handleSubmitNewTimeEntry = (timeEntry) => {
    setIsLoadingTimeEntriesForm(true)
    setErrorMessages(null)
    createTimeEntry({
      variables: { newTimeEntry: timeEntry },
    })
  }

  const [updateTimeEntry, { loading: isSubmittingEditTimeEntry }] = useMutation(UPDATE_TIME_ENTRY, {
    onCompleted: (data) => {
      const updatedTimeEntry = data.updateTimeEntry

      setTimeEntriesData((prevData) => ({
        ...prevData,
        timeEntries: prevData.timeEntries.map((entry) =>
          entry.id === updatedTimeEntry.id ? updatedTimeEntry : entry,
        ),
      }))

      setIsLoadingTimeEntriesForm(false)
      timeEntryFormModalState.closeModal()
      setTimeEntryBeingEdited(null)
    },
    onError: (errors) => {
      setIsLoadingTimeEntriesForm(false)
      const messages = errors.graphQLErrors
        ? errors.graphQLErrors.map((e) => e.message)
        : ['Noget gik galt. Prøv igen.']
      setErrorMessages(messages)
    },
  })

  const handleSubmitEditedTimeEntry = (updatedTimeEntry) => {
    setIsLoadingTimeEntriesForm(true)
    setErrorMessages(null)

    updateTimeEntry({
      variables: {
        updateTimeEntryId: timeEntryBeingEdited.id,
        updatedTimeEntry: updatedTimeEntry,
      },
    })
  }

  const [deleteTimeEntry] = useMutation(DELETE_TIME_ENTRY, {
    onCompleted: ({ deleteTimeEntry }) => {
      setTimeEntriesData((prev) => ({
        ...prev,
        timeEntries: prev.timeEntries.filter((timeEntry) => timeEntry.id !== deleteTimeEntry),
      }))

      if (openNotification?.id === deleteTimeEntry) {
        setOpenNotification(null)
        notificationInfoModalState.closeModal()
      }
    },
    onError: (err) => {
      console.error('Failed to delete entry:', err)
    },
  })

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
    isSubmittingEditTimeEntry,
    updateTimeEntry,
    handleSubmitEditedTimeEntry,
  }
}
