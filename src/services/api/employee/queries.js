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
    employee(id: "20") {
      id
      firstName
      lastName
      timeEntries {
        date
        startTime
        endTime
        duration
        comment
        id
      }
    }
  }
`;
