import { gql } from '@apollo/client'

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($newEmployee: CreateEmployeeInput) {
    createEmployee(newEmployee: $newEmployee) {
      id
      firstName
      lastName
      roleName
      permissionLevel
      email
      phoneNumber
    }
  }
`

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($updateEmployeeId: ID!, $updatedEmployee: CreateEmployeeInput!) {
    updateEmployee(id: $updateEmployeeId, updatedEmployee: $updatedEmployee) {
      id
      firstName
      lastName
      email
      roleName
      permissionLevel
      phoneNumber
    }
  }
`
