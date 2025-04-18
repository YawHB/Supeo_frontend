import { gql, useQuery } from '@apollo/client';

const GET_TIME_ENTRIES = gql`
    query {
        timeEntries {
            id
            startTime
            endTime
            duration
            date
            comment
        }
    }
`;
export function EmployeeListPage() {
    console.log('enployee');
    const { loading, error, data } = useQuery(GET_TIME_ENTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <h1>Admin Homepage</h1>

            {data.timeEntries.map((entry) => (
                <div key={entry.id}>
                    {console.log(entry)}
                    <p>Starttime: {entry.startTime}</p>
                    <p>Endtime: {entry.endTime}</p>
                    <p>Durantion: {entry.duration}</p>
                    <p>date: {entry.date}</p>
                    <p>Comment: {entry.comment}</p>
                    <hr />
                </div>
            ))}
        </>
    );
}
