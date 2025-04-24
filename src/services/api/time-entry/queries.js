import { gql } from '@apollo/client';

export const GET_ALL_TIME_ENTRIES = gql`
  query {
    timeEntries {
      id
      startTime
      endTime
      duration
      comment
      date
      status
      firstName
      lastName
    }
  }
`;

export const GET_TIME_ENTRY = gql`
  query ($id: ID!) {
    timeEntry(id: $id) {
      id
      startTime
      endTime
      duration
      comment
    }
  }
`;
