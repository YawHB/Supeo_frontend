import React from "react";
import { Row, Col, Table } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useTimeEntriesPageState } from "./TimeEntriesPageState.js";

export const EmployeeTimeEntriesPage = () => {
  console.log("Inside time entries page");
  const [translate] = useTranslation("global");
  const state = useTimeEntriesPageState();

  document.title = translate("nav_bar.admin_employees");

  console.log(state.timeEntriesData);
  console.log(state.timeEntriesData.firstName);
  console.log(state.timeEntriesData.timeEntries);
  const { firstName, lastName, role } = state.timeEntriesData;

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className="d-flex justify-content-between gap-4">
            <h1>
              {firstName} {lastName} - {role}
            </h1>
            <div className="d-flex align-items-center gap-4"></div>
          </Col>

          {!state.isLoadingTimeEntries && (
            <div className="mt-4">
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    {state.timeEntriesColumns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {state.timeEntriesData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={state.timeEntriesColumns.length}
                        className="text-center"
                      >
                        {translate("no_data")}
                      </td>
                    </tr>
                  ) : (
                    state.timeEntriesData.timeEntries.map((timeEntry) => (
                      <tr key={timeEntry.id}>
                        {state.timeEntriesColumns.map((column) => (
                          <td key={column.key}>
                            {column.type === "view"
                              ? column.view(timeEntry)
                              : timeEntry[column.key]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};
