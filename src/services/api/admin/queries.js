import { gql } from '@apollo/client';

export const GET_ALL_EMPLOYEES = gql`
    query Employees {
        employees {
            id
            firstName
            lastName
            phoneNumber
            email
        }
    }
`;

export const GET_EMPLOYEE = gql`
    query Employee($employeeId: ID!) {
        employee(id: $employeeId) {
            id
            lastName
            firstName
            email
            phoneNumber
            timeEntries {
                id
            }
        }
    }
`;
