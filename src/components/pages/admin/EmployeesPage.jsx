import CreateEmployeeForm from "../../forms/CreateEmployeeForm";
import React from "react";
import { useTranslation } from "react-i18next";
import useEmployeesPageState from "./EmployeesPageState";
import { Row, Col, Table, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

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
                onClick={() => state.newEmployeeFormModalState.openModal({})}
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

      <Modal
        isOpen={state.newEmployeeFormModalState.isOpen}
        toggle={state.newEmployeeFormModalState.closeModal}
        size="lg"
      >
        <ModalHeader toggle={state.newEmployeeFormModalState.closeModal}>
          {translate("admin.create_new_employee")}
        </ModalHeader>

        <ModalBody>
          <CreateEmployeeForm onSubmit={state.handleSubmitNewEmployee} />
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            form="newEmployeeForm"
            disabled={state.isLoadingEmployeesForm}
          >
            {state.isLoadingEmployeesForm ? "Loading..." : translate("create")}
          </Button>
          <Button
            color="secondary"
            onClick={state.newEmployeeFormModalState.closeModal}
          >
            {translate("cancel")}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={state.employeeFormModalState.isOpen}
        toggle={state.employeeFormModalState.closeModal}
        size="lg"
      >
        <ModalHeader toggle={state.employeeFormModalState.closeModal}>
          {translate("update_employee")}
        </ModalHeader>

        <ModalBody>
          <CreateEmployeeForm
            onSubmit={state.handleSubmitEditedEmployee}
            employee={state.employeeBeingEdited}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            form="newEmployeeForm"
            disabled={state.isLoadingEmployeesForm}
          >
            {state.isLoadingEmployeesForm ? "Loading..." : translate("update")}
          </Button>
          <Button
            color="secondary"
            onClick={state.employeeFormModalState.closeModal}
          >
            {translate("cancel")}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EmployeesPage;
