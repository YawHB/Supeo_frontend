import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEES = gql`
  query Employees {
    employees {
      id
      firstName
      lastName
      phoneNumber
      role
      email
    }
  }
`;

// export const GET_EMPLOYEES = gql`
//   query GetEmployees($pagination: PaginationInput!) {
//     employees(pagination: $pagination) {
//       pagination {
//         page
//         perPage
//         totalCount
//       }
//       items {
//         id
//         firstName
//         lastName
//         role
//         email
//         phoneNumber
//       }
//     }
//   }
// `;

export const GET_EMPLOYEE = gql`
  query Employee($employeeId: ID!) {
    employee(id: $employeeId) {
      id
      lastName
      firstName
      email
      phoneNumber
      role
      timeEntries {
        id
      }
    }
  }
`;

// export const GET_ALL_EMPLOYEES = gql`
//   query GetEmployees(
//     $searchString: String
//     $order: String
//     $orderBy: String
//     $pagination: PaginationInput!
//   ) {
//     employees(
//       searchString: $searchString
//       order: $order
//       orderBy: $orderBy
//       pagination: $pagination
//     ) {
//       pagination {
//         page
//         perPage
//         totalCount
//       }
//       items {
//         id
//         firstName
//         lastName
//         role
//         email
//         phoneNumber
//       }
//     }
//   }
// `;
