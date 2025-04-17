import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
    query {
        employees {
            id
            firstName
            lastName
            role
        }
    }
`;
