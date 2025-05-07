import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
  query GET_ALL_EMPLOYEES($page: Int!, $perPage: Int!) {
    employees(pagination: { page: $page, perPage: $perPage }) {
      pagination {
        page
        perPage
        totalCount
      }
      employees {
        id
        firstName
        lastName
        phoneNumber
        email
      }
    }
  }
`;


export const GET_EMPLOYEE = gql`
  query Employee($employeeId: ID!) {
    employee(id: $employeeId) {
      id
      lastName
      firstName
      email
      phoneNumber
      timeEntries {
        id
      }
    }
  }
`;
