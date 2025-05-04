import React from "react";
import { useTranslation } from "react-i18next";
import useEmployeesPageState from "./EmployeesPageState";
import useSideBarState from "../../sidebar/SideBarState";
import CreateEmployeeForm from "../../forms/CreateEmployeeForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Table } from "reactstrap";
import SideBar from "../../sidebar/Sidebar";
import { faUserPlus, faFileExcel } from "@fortawesome/free-solid-svg-icons";

const EmployeesPage = () => {
  const [translate] = useTranslation("global");
  const state = useEmployeesPageState();
  const sideBarState = useSideBarState();

  document.title = translate("page_title.administration_employees");

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
        </Col>
        
      </Row>

      <Modal
        isOpen={state.newEmployeeFormModalState.isOpen}
        toggle={state.newEmployeeFormModalState.closeModal}
        returnFocusAfterClose={false}
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
        returnFocusAfterClose={false}
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
