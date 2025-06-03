import { gql } from '@apollo/client'

export const GET_ALL_TIME_ENTRIES = gql`
  query GetAllTimeEntries($search: String, $sort: SortInput) {
    timeEntries(search: $search, sort: $sort) {
      id
      startTime
      endTime
      duration
      comment
      break
      startDate
      endDate
      employee {
        id
        firstName
        lastName
      }
      notification {
        id
        comment
        status
      }
    }
  }
`

export const GET_ALL_FILTERED_TIME_ENTRIES = gql`
  query FilteredTimeEntries($filter: TimeEntryFilterInput!) {
    filteredTimeEntries(filter: $filter) {
      id
      startTime
      endTime
      duration
      comment
      startDate
      endDate
      employee {
        id
        firstName
        lastName
      }
      notification {
        id
        comment
        status
      }
    }
  }
`
