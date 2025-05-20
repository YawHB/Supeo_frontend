import { gql } from '@apollo/client'

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($newEmployee: CreateEmployeeInput) {
    createEmployee(newEmployee: $newEmployee) {
      id
      firstName
      lastName
      email
      phoneNumber
      roleName
      permissionLevel
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
      phoneNumber
      roleName
      permissionLevel
    }
  }
`
