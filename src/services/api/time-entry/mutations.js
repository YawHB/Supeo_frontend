import { gql } from "@apollo/client";

export const CREATE_TIME_ENTRY = gql`
  mutation CreateTimeEntry($newTimeEntry: CreateTimeEntryInput!) {
    createTimeEntry(newTimeEntry: $newTimeEntry) {
      startTime
      endTime
      duration
      comment
      startDate
      endDate
      employeeID
      notification {
        comment
        status
        timestamp
      }
    }
  }
`;
