import { gql } from '@apollo/client'

export const GET_TIME_ENTRIES_FOR_EMPLOYEE = gql`
  query {
    employee(id: "10") {
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

export const GET_PAGINATED_EMPLOYEES = gql`
  query GetPaginatedEmployees(
    $page: Int!
    $perPage: Int!
    $search: String
    $roles: [String!]
    $permissions: [String!]
  ) {
    paginatedEmployees(
      pagination: { page: $page, perPage: $perPage }
      search: $search
      roles: $roles
      permissions: $permissions
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
        roleName
        permissionLevel
        phoneNumber
      }
    }
  }
`

// WIP QUERIES MED DET HELE

// export const GET_ALL_EMPLOYEES = gql`
//   query Employees(
//     $search: String
//     $order: String
//     $orderBy: String
//     $pagination: PaginationInput
//     $employeeRole: [Int!]
//     $employeePermission: [Int!]
//   ) {
//     employees(
//       search: $search
//       order: $order
//       orderBy: $orderBy
//       pagination: $pagination
//       employeeRole: $employeeRole
//       employeePermission: $employeePermission
//     ) {
//       pagination {
//         page
//         perPage
//         totalCount
//       }
//       employees {
//         id
//         firstName
//         lastName
//         email
//         phoneNumber
//         roleName
//         permissionLevel
//         employeeRole {
//           id
//           roleName
//         }
//         employeePermission {
//           id
//           permissionLevel
//         }
//       }
//     }
//   }
// `
