import React from 'react'
import SideBar from '../../../sidebar/Sidebar'
import { useTranslation } from 'react-i18next'
import EmployeeForm from '../../../forms/employee/EmployeeForm'
import useSideBarState from '../../../sidebar/SideBarState'
import useEmployeesPageState from '../employees/EmployeesPageState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faFileExcel, faSave } from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Table,
  Input,
} from 'reactstrap'
import Select from 'react-select'

const EmployeesPage = () => {
  const [translate] = useTranslation(`global`)
  const state = useEmployeesPageState()
  const sideBarState = useSideBarState()

  document.title = translate('page_title.administration_employees')

  return (
    <>
      <Row>
        <Col xs='auto' style={{ minWidth: '130px', maxWidth: '270px' }}>
          <SideBar
            sideBarItems={sideBarState.sideBarItems}
            isSideBarCollapsed={sideBarState.isSideBarCollapsed}
            toggleSideBarCollapse={sideBarState.toggleSideBarCollapse}
          />
        </Col>

        <Col>
          <Col xs={12} className='d-flex justify-content-between gap-4'>
            <h1>{translate('employees')}</h1>
            <div className='d-flex align-items-center gap-4'>
              {/* <Select
                isinline="true"
                styles={{ minWidth: "200px" }}
                state={state.employeeRolesFilterInput}
                options={state.employeeRoleOptions ?? []}
                placeholder={translate("admin.select_employee_role")}
              />
              <Input
                isinline="true"
                styles={{ minWidth: "200px" }}
                state={state.searchInput}
                placeholder={translate("admin.search_employee")}
              /> */}
              <Button outline color='primary' onClick={state.handleExportTable}>
                <FontAwesomeIcon icon={faFileExcel} className='me-2' />
                <span>{translate('export')}</span>
              </Button>
              <Button
                color='primary'
                outline
                onClick={() => {
                  state.setEmployeeBeingEdited(null)
                  state.newEmployeeFormModalState.openModal()
                }}
                className='no-wrap'
                style={{ minWidth: '200px' }}
              >
                <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                <span>{translate(`admin.create_employee`)}</span>
              </Button>
            </div>
            {/* <div>
              <Paginator
                paginationState={state.pagination.state}
              />
            </div> */}
          </Col>

          {!state.isLoadingEmployees && (
            <Table responsive>
              <thead>
                <tr>
                  {state.employeesTableColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.employees.length === 0 ? (
                  <tr>
                    <td colSpan={state.employeesTableColumns.length} className='text-center'>
                      {translate('no_data')}
                    </td>
                  </tr>
                ) : (
                  state.employees.map((employee) => (
                    <tr key={employee.id}>
                      {state.employeesTableColumns.map((column) => (
                        <td key={column.key}>
                          {column.type === 'view' ? column.view(employee) : employee[column.key]}
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

      <Modal
        size='lg'
        returnFocusAfterClose={false}
        isOpen={state.newEmployeeFormModalState.isOpen}
        toggle={state.newEmployeeFormModalState.closeModal}
      >
        <ModalHeader toggle={state.newEmployeeFormModalState.closeModal}>
          {translate('admin.create_new_employee')}
        </ModalHeader>

        <ModalBody>
          <EmployeeForm
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
            type='submit'
            color='primary'
            form='newEmployeeForm'
            disabled={state.isSubmittingNewEmployee || state.isUpdatingEmployee}
          >
            <FontAwesomeIcon icon={faSave} className='me-2' />
            {translate('create')}
          </Button>

          <Button color='secondary' onClick={state.newEmployeeFormModalState.closeModal}>
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        size='lg'
        returnFocusAfterClose={false}
        isOpen={state.employeeFormModalState.isOpen}
        toggle={state.employeeFormModalState.closeModal}
      >
        <ModalHeader toggle={state.employeeFormModalState.closeModal}>
          {translate('admin.edit_employee', {
            firstName: state.employeeBeingEdited?.firstName ?? '',
            lastName: state.employeeBeingEdited?.lastName ?? '',
          })}
        </ModalHeader>

        <ModalBody>
          <EmployeeForm
            employee={state.employeeBeingEdited}
            onSubmit={state.handleSubmitEditedEmployee}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            color='primary'
            form='newEmployeeForm'
            disabled={state.isLoadingEmployeesForm}
          >
            <FontAwesomeIcon icon={faSave} className='me-2' />
            {translate('save')}
          </Button>

          <Button color='secondary' onClick={state.employeeFormModalState.closeModal}>
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default EmployeesPage
