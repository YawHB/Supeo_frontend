import { gql } from '@apollo/client';

export const CREATE_TIME_ENTRY = gql`
    mutation CreateTimeEntry($newTimeEntry: createTimeEntryInput!) {
        createTimeEntry(newTimeEntry: $newTimeEntry) {
            startTime
            endTime
            duration
            comment
            date
            employeeID
            notification {
                comment
                status
                timestamp
            }
        }
    }
`;
