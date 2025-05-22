import { gql } from '@apollo/client'

export const GET_ALL_TIME_ENTRIES = gql`
  query {
    timeEntries {
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
