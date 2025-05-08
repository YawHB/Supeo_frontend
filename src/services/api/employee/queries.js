import { gql } from "@apollo/client";

export const GET_EMPLOYEES = gql`
  query {
    employees {
      id
      firstName
      lastName
    }
  }
`;

export const GET_TIME_ENTRIES_FOR_EMPLOYEE = gql`
  query {
    employee(id: "10") {
      id
      firstName
      lastName
      timeEntries {
        startDate
        startTime
        endDate
        endTime
        duration
        comment
        id
        notification {
          id
          status
          comment
          timestamp
        }
      }
    }
  }
`

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      roleName
    }
  }
`