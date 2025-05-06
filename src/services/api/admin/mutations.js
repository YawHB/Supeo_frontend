import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
    mutation CreateEmployee($newEmployee: CreateEmployeeInput) {
        createEmployee(newEmployee: $newEmployee) {
            id
            firstName
            lastName
            email
            phoneNumber
        }
    }
`;

export const UPDATE_EMPLOYEE = gql`
    mutation UpdateEmployee(
        $updateEmployeeId: ID!
        $updatedEmployee: CreateEmployeeInput!
    ) {
        updateEmployee(
            id: $updateEmployeeId
            updatedEmployee: $updatedEmployee
        ) {
            id
            firstName
            lastName
            email
            phoneNumber
        }
    }
`;

export const UPDATE_TIME_ENTRY_STATUS = gql`
    mutation UpdateTimeEntryStatus($id: ID!, $status: String!) {
        updateTimeEntryStatus(id: $id, status: $status) {
            notification {
                id
                status
            }
        }
    }
`;
