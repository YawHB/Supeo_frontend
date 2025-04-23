import React from "react";
import { useTranslation } from "react-i18next";
import useEmployeesPageState from "./EmployeesPageState";
import CreateEmployeeForm from "../../forms/CreateEmployeeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Table } from "reactstrap";

const EmployeesPage = () => {
  const [ translate ] = useTranslation("global");
  const state = useEmployeesPageState();

  document.title = translate("page_title.administration_employees");

  return (
    <>
      <Row>
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
      </Row>

      <Row>
        <Col>
          {!state.isLoadingEmployees && (
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
          )}
        </Col>
      </Row>

      <div className="d-flex justify-content-between">
        <div>
          <Button
            color="info"
            outline
            onClick={state.handleExportTable}
            className="no-wrap me-3 mb-4"
          >
            <FontAwesomeIcon icon={faFileExcel} className="me-2" />
            <span>{translate(`admin.export`)}</span>
          </Button>
        </div>
      </div>

      <Modal
        isOpen={state.newEmployeeFormModalState.isOpen}
        toggle={state.newEmployeeFormModalState.closeModal}
        size="lg"
      >
        <ModalHeader toggle={state.newEmployeeFormModalState.closeModal}>
          {translate("admin.create_new_employee")}
        </ModalHeader>

        <ModalBody>
          <CreateEmployeeForm
            onSubmit={
              state.employeeBeingEdited?.id
                ? state.handleSubmitEditedEmployee
                : state.handleSubmitNewEmployee
            }
            isSubmitting={state.isLoadingEmployeesForm}
            employee={state.employeeBeingEdited}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            form="newEmployeeForm"
            disabled={state.isSubmittingNewEmployee || state.isUpdatingEmployee}
          >
            {translate("create")}
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
          {translate("admin.update_employee")}
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
            {translate("update")}
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
