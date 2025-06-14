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
export const GET_EMPLOYEE_BY_ID = gql`
  query employeeByID($id: ID!) {
    employeeByID(id: $id) {
      firstName
      lastName
      email
      phoneNumber
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
  query GetAllEmployees($filter: EmployeeFilterInput, $sort: SortInput) {
    filteredEmployees(filter: $filter, sort: $sort) {
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

export const GET_PAGINATED_EMPLOYEES = gql`
  query GetPaginatedEmployees(
    $page: Int!
    $perPage: Int!
    $search: String
    $roles: [String!]
    $permissions: [String!]
    $sort: SortInput
  ) {
    paginatedEmployees(
      pagination: { page: $page, perPage: $perPage }
      search: $search
      roles: $roles
      permissions: $permissions
      sort: $sort
    ) {
      pagination {
        page
        perPage
        totalCount
      }
      employees {
        id
        firstName
        lastName
        email
        phoneNumber
        roleName
        permissionLevel
      }
    }
  }
`

export const SEARCH_TIME_ENTRIES_FOR_EMPLOYEE = gql`
  query SearchTimeEntriesForEmployee($employeeId: ID!, $search: String, $sort: SortInput) {
    timeEntriesForEmployee(employeeId: $employeeId, search: $search, sort: $sort) {
      id
      startDate
      startTime
      endDate
      endTime
      duration
      break
      comment
      notification {
        id
        status
        comment
        timestamp
      }
    }
  }
`
