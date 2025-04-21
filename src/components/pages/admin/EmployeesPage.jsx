import React from "react";
import { useTranslation } from "react-i18next";
import useEmployeesPageState from "./EmployeesPageState";
import { Row, Col, Table } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "reactstrap";

const EmployeesPage = () => {
  const [translate] = useTranslation("global");
  const state = useEmployeesPageState();

  document.title = translate("nav_bar.admin_employees");

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className="d-flex justify-content-between gap-4">
            <h1>{translate("employees")}</h1>
            <div className="d-flex align-items-center gap-4">
              <Button
                color="primary"
                outline
                onClick={() => state.setEmployeeBeingEdited({})}
                className="no-wrap"
                style={{ minWidth: "200px" }}
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                <span>{translate(`admin.create_employee`)}</span>
              </Button>
            </div>
          </Col>

          {!state.isLoadingEmployees && (
            <div className="mt-4">
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    {state.employeesTableColumns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {state.employees.length === 0 ? (
                    <tr>
                      <td
                        colSpan={state.employeesTableColumns.length}
                        className="text-center"
                      >
                        {translate("no_data")}
                      </td>
                    </tr>
                  ) : (
                    state.employees.map((employee) => (
                      <tr key={employee.id}>
                        {state.employeesTableColumns.map((column) => (
                          <td key={column.key}>
                            {column.type === "view"
                              ? column.view(employee)
                              : employee[column.key]}
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

export default EmployeesPage;
