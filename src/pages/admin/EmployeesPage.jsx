import { Row, Col, Modal } from "reactstrap";
import { useTranslation } from "react-i18next";
import { gql } from "@apollo/client";

import useEmployeesPageState from "./EmployeesPageState";

const EmployeesPage = () => {
  const [translate] = useTranslation(`global`);

  const state = useEmployeesPageState();

  document.title = translate(`employees`);

  return (
    <>
      <Row>
        <Col xs={12} className="d-flex justify-content-between gap-4">
          <h1>{translate(`employees`)}</h1>
          <div className="d-flex align-items-center gap-4"></div>
        </Col>
      </Row>

      <Modal
        state={state.employeeFormModalState}>

      </Modal>
    </>
  );
};

export default EmployeesPage;





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

// export function EmployeeListPage() {
//     console.log('enployee');
//     const { loading, error, data } = useQuery(GET_TIME_ENTRIES);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;

//     return (<>
//     <Row>
//         <Col>
//         </Col>
//     </Row>
//             <h1>Admin Homepage</h1>

//             {data.timeEntries.map((entry) => (
//                 <div key={entry.id}>
//                     <p>Starttime: {entry.startTime}</p>
//                     <p>Endtime: {entry.endTime}</p>
//                     <p>Durantion: {entry.duration}</p>
//                     <p>Comment: {entry.comment}</p>
//                     <hr />
//                 </div>
//             ))}
//         </>
//     );
// }
