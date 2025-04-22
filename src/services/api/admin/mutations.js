import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($newEmployee: CreateEmployeeInput) {
    createEmployee(newEmployee: $newEmployee) {
      id
      firstName
      lastName
      role
      email
      phoneNumber
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: Int!
    $firstName: String
    $lastName: String
    $role: String
    $email: String
    $phoneNumber: String
    $companyId: Int
  ) {
    updateEmployee(
      id: $id
      firstName: $firstName
      lastName: $lastName
      role: $role
      email: $email
      phoneNumber: $phoneNumber
      companyId: $companyId
    ) {
      id
    }
  }
`;
