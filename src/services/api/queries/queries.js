import { gql } from "@apollo/client";

export const EMPLOYEES = gql`
  query Employees(
    $firstName: Int
    $lastName: Int
    $role: Int
    $email: Int
    $phoneNumber: Int
    $companyId: [Int]
  ) {
    employees(
      firstName: $firstName
      lastName: $lastName
      role: $role
      email: $email
      phoneNumber: $phoneNumber
      companyId: $companyId
    ) {
      employees {
        id
        firstName
        lastName
        role
        email
        phoneNumber
        companyId
      }
      id
    }
  }
`;
