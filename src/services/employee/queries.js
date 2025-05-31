import { gql } from '@apollo/client'

export const GET_TIME_ENTRIES_FOR_EMPLOYEE = gql`
  query employee($id: ID!) {
    employee(id: $id) {
      id
      firstName
      lastName
      timeEntries {
        startDate
        startTime
        endDate
        endTime
        duration
        break
        comment
        id
        notification {
          id
          status
          comment
          timestamp
        }
      }
    }
  }
`

export const GET_ROLES = gql`
  query Roles {
    roles {
      id
      roleName
    }
  }
`

export const GET_PERMISSIONS = gql`
  query Permissions {
    permissions {
      id
      permissionLevel
    }
  }
`

export const GET_ALL_EMPLOYEES = gql`
  query Employees($search: String) {
    employees(search: $search) {
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

export const GET_ALL_FILTERED_EMPLOYEES = gql`
  query GetAllEmployees($filter: EmployeeFilterInput) {
    filteredEmployees(filter: $filter) {
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
