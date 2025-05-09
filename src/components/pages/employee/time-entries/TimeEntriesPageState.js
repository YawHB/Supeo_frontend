import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { useApolloClient } from '@apollo/client'
import { GET_TIME_ENTRIES_FOR_EMPLOYEE } from '../../../../services/api/employee/queries.js'
export const useTimeEntriesPageState = () => {
  const apolloClient = useApolloClient()

  const [translate] = useTranslation(`global`)
  const [timeEntriesData, setTimeEntriesData] = useState([])

  const timeEntriesColumns = [
    {
      key: 'date',
      label: translate('date'),
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
      key: 'comment',
      label: translate('comment'),
      type: 'text',
      sort: true,
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
      console.log(data)
      setTimeEntriesData(data.employee)
    },
    onError: (error) => {
      console.error('Error fetching timeEntries:', error)
    },
  })

  return {
    translate,
    timeEntriesData,
    setTimeEntriesData,
    apolloClient,
    isLoadingTimeEntries,
    timeEntriesColumns,
  }
}
