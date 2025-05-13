import { gql } from '@apollo/client'

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
`

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($updateEmployeeId: ID!, $updatedEmployee: CreateEmployeeInput!) {
    updateEmployee(id: $updateEmployeeId, updatedEmployee: $updatedEmployee) {
      id
      firstName
      lastName
      email
      role
      phoneNumber
    }
  }
`

export const UPDATE_TIME_ENTRY_STATUS = gql`
  mutation Mutation($notification: NotificationStatusInput!) {
    updateTimeEntryStatus(notification: $notification) {
      id
      status
      comment
    }
  }
`
