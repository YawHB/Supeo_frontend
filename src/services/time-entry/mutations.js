import { gql } from '@apollo/client'

export const CREATE_TIME_ENTRY = gql`
  mutation CreateTimeEntry($newTimeEntry: CreateTimeEntryInput!) {
    createTimeEntry(newTimeEntry: $newTimeEntry) {
      startTime
      endTime
      duration
      comment
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

export const DELETE_TIME_ENTRY = gql`
  mutation DeleteTimeEntry($id: ID!) {
    deleteTimeEntry(id: $id)
  }
`

export const UPDATE_TIME_ENTRY = gql`
  mutation UpdateTimeEntry($updateTimeEntryId: ID!, $updatedTimeEntry: UpdateTimeEntryInput!) {
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
