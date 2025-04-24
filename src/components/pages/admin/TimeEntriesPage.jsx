import React from "react";
import { Row, Col, Table } from "reactstrap";
import { useTranslation } from "react-i18next";
import useTimeEntriesPageState from "./TimeEntriesPageState";
import useSideBarState from "../../sidebar/SideBarState";
import SideBar from "../../sidebar/Sidebar";

const TimeEntriesPage = () => {
  const [ translate ] = useTranslation("global");
  const state = useTimeEntriesPageState();
  const sideBarState = useSideBarState();

  document.title = translate("page_title.administration_time_entries");

  return (
    <>
      <Row>
        <Col xs="auto" style={{ minWidth: "130px", maxWidth: "270px" }}>
          <SideBar
            sideBarItems={sideBarState.sideBarItems}
            isSideBarCollapsed={sideBarState.isSideBarCollapsed}
            toggleSideBarCollapse={sideBarState.toggleSideBarCollapse}
          />
        </Col>

        <Col>
          <Col xs={12} className="d-flex justify-content-between gap-4">
            <h1>{translate("nav_bar.admin_time_entries")}</h1>
            <div className="d-flex align-items-center gap-4"></div>
          </Col>

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
                          {column.key === "status" ? (
                            <select
                              className="form-select"
                              value={timeEntry[column.key]}
                              onChange={(e) =>
                                state.handleStatusChange(timeEntry.id, e.target.value)
                              }
                            >
                              {column.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            timeEntry[column.key]
                          )}
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
    </>
  );
};

export default TimeEntriesPage;
