import { gql } from '@apollo/client'

export const CREATE_TIME_ENTRY = gql`
  mutation CreateTimeEntry($newTimeEntry: CreateTimeEntryInput!) {
    createTimeEntry(newTimeEntry: $newTimeEntry) {
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
      }
      notification {
        comment
        status
        timestamp
      }
    }
  }
`

export const UPDATE_TIME_ENTRY = gql`
  mutation UpdateTimeEntry($updateTimeEntryId: ID!, $updatedTimeEntry: TimeEntryInput!) {
    updateTimeEntry(id: $updateTimeEntryId, updatedTimeEntry: $updatedTimeEntry) {
      id
      startDate
      startTime
      endDate
      endTime
      duration
      break
      comment
      employee {
        id
      }
      notification {
        comment
        status
        timestamp
      }
    }
  }
`

export const DELETE_TIME_ENTRY = gql`
  mutation DeleteTimeEntry($id: ID!) {
    deleteTimeEntry(id: $id)
  }
`
