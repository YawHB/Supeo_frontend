import React from "react";
import { Row, Col, Table } from "reactstrap";
import { useTranslation } from "react-i18next";
import useTimeEntriesPageState from "./TimeEntriesPageState";

const TimeEntriesPage = () => {
  const [ translate ] = useTranslation("global");
  const state = useTimeEntriesPageState();

  document.title = translate("page_title.administration_time_entries");

  return (<>
      <Row>
        <Col xs={12} className="d-flex justify-content-between gap-4">
          <h1>{translate("nav_bar.admin_time_entries")}</h1>
          <div className="d-flex align-items-center gap-4"></div>
        </Col>
      </Row>

      <Row>
        <Col>
          {!state.isLoadingTimeEntries && (
            <Table striped bordered hover responsive>
              <thead className="table-light">
                <tr>
                  {state.timeEntriesTableColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {state.timeEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={state.timeEntriesTableColumns.length}
                      className="text-center"
                    >
                      {translate("no_data")}
                    </td>
                  </tr>
                ) : (
                  state.timeEntries.map((timeEntry) => (
                    <tr key={timeEntry.id}>
                      {state.timeEntriesTableColumns.map((column) => (
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
          )}
        </Col>
      </Row>
    </>);
};

export default TimeEntriesPage;
