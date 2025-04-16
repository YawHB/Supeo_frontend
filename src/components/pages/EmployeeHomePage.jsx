import { useQuery, gql } from '@apollo/client';

const GET_TIME_ENTRIES = gql`
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

export function EmployeeHomePage() {
    const { loading, error, data } = useQuery(GET_TIME_ENTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h1>Employee Homepage</h1>
            {data.timeEntries.map((entry) => (
                <div key={entry.id}>
                    <p>Starttime: {entry.startTime}</p>
                    <p>Endtime: {entry.endtime}</p>
                    <p>Durantion: {entry.duration}</p>
                    <p>Comment: {entry.comment}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}
