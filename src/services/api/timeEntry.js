// services/api/timeEntries.ts
import { gql } from '@apollo/client';

export const GET_TIME_ENTRIES = gql`
    query {
        timeEntries {
            id
            startTime
            endTime
            duration
            comment
        }
    }
`;
