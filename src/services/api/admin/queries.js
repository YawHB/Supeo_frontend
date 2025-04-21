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
