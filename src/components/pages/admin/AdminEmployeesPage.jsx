import { useTranslation } from 'react-i18next'
import EmployeeForm from '../../forms/employee/EmployeeForm.jsx'
import useEmployeesPageState from './adminEmployeesPageState.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faFileExcel, faSave } from '@fortawesome/free-solid-svg-icons'
import { Row, Col, Input, Modal, Table, Button, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import Select from 'react-select'
import Paginator from '../../Paginator.jsx'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext.js'
const AdminEmployeesPage = () => {
  const context = useContext(AuthContext)
  const state = useEmployeesPageState()
  const [translate] = useTranslation(`global`)

  document.title = translate('page_title.administration_employees')

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className='d-flex justify-content-between gap-4'>
            <h1>{translate('employees')}</h1>
            <div className='d-flex align-items-center gap-4'>
              <Select
                isSearchable={false}
                isMulti
                options={state.employeeRoleOptions ?? []}
                value={state.employeeRolesFilterInput.value}
                onChange={(newValue) => {
                  state.employeeRolesFilterInput.onChange(newValue)
                  state.filteredEmployees({
                    variables: {
                      filter: {
                        roleNames: newValue.map((r) => r.value),
                        permissionLevels: state.selectedPermissions,
                      },
                    },
                  })
                }}
                classNamePrefix='employee-role-select'
                placeholder={translate('admin.select_employee_role')}
              />
              <Select
                isSearchable={false}
                isMulti
                options={state.employeePermissionOptions ?? []}
                value={state.employeePermissionsFilterInput.value}
                onChange={(newValue) => {
                  state.employeePermissionsFilterInput.onChange(newValue)
                  state.filteredEmployees({
                    variables: {
                      filter: {
                        roleNames: state.selectedRoles,
                        permissionLevels: newValue.map((p) => p.value),
                      },
                    },
                  })
                }}
                classNamePrefix='employee-role-select'
                placeholder={translate('admin.select_employee_permission')}
              />
              <Input
                className='search-input'
                value={state.searchInput.value}
                onChange={state.searchInput.onChange}
                placeholder={translate('admin.search_employee')}
              />
              <Button outline color='primary' className='no-wrap' onClick={state.handleExportTable}>
                <FontAwesomeIcon icon={faFileExcel} className='me-2' />
                <span>{translate('export')}</span>
              </Button>
              {context.user?.permissionLevel === 'Admin' && (
                <Button
                  outline
                  color='primary'
                  className='no-wrap'
                  onClick={() => {
                    state.setEmployeeBeingEdited(null)
                    state.employeeFormModalState.openModal()
                  }}
                >
                  <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                  <span>{translate(`admin.create_employee`)}</span>
                </Button>
              )}
            </div>
          </Col>

          <Table responsive>
            <thead>
              <tr>
                {state.employeesTableColumns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => column.sort && state.sort(column.key)}
                    className={column.sort ? 'sortable' : ''}
                  >
                    {column.label}
                    {column.sort && state.sortIcon(column.key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.employees.map((row, index) => (
                <tr key={index}>
                  {state.employeesTableColumns.map((column) => (
                    <td key={column.key}>
                      {column.type === 'view' ? column.view(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {state.employees.length === 0 && (
                <tr>
                  <td colSpan={state.employeesTableColumns.length} className='text-center'>
                    {translate('no_data')}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      <div className='d-flex justify-content-end'>
        <Paginator
          paginationState={state.pagination.state}
          onPageChange={state.pagination.setPage}
          onPerPageChange={state.pagination.setPerPage}
          perPageOptions={state.pagination.perPageOptions}
        />
      </div>

      <Modal
        size='md'
        isOpen={state.employeeFormModalState.isOpen}
        toggle={() => {
          state.resetErrorMessages()
          state.employeeFormModalState.closeModal()
        }}
        returnFocusAfterClose={false}
      >
        <ModalHeader
          toggle={() => {
            state.resetErrorMessages()
            state.employeeFormModalState.closeModal()
          }}
        >
          {state.employeeBeingEdited
            ? translate('admin.edit_employee', {
                firstName: state.employeeBeingEdited.firstName,
                lastName: state.employeeBeingEdited.lastName,
              })
            : translate('admin.create_new_employee')}
        </ModalHeader>

        <ModalBody>
          <EmployeeForm
            employee={state.employeeBeingEdited}
            onSubmit={
              state.employeeBeingEdited
                ? state.handleSubmitEditedEmployee
                : state.handleSubmitNewEmployee
            }
            errorMessages={state.errorMessages}
            isSubmitting={state.isLoadingEmployeesForm}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            color='primary'
            form='employeeForm'
            disabled={state.isLoadingEmployeesForm}
          >
            <FontAwesomeIcon icon={faSave} className='me-2' />
            {state.employeeBeingEdited ? translate('save') : translate('create')}
          </Button>
          <Button
            color='secondary'
            onClick={() => {
              state.employeeFormModalState.closeModal()
              state.resetErrorMessages()
            }}
          >
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default AdminEmployeesPage
