import { useTranslation } from 'react-i18next'
import EmployeeForm from '../../forms/employee/EmployeeForm.jsx'
import useEmployeesPageState from './adminEmployeesPageState.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faFileExcel, faSave } from '@fortawesome/free-solid-svg-icons'
import {
  Row,
  Col,
  Input,
  Modal,
  Table,
  Button,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from 'reactstrap'
import Select from 'react-select'

const AdminEmployeesPage = () => {
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
              <Button outline color='primary' onClick={state.handleExportTable}>
                <FontAwesomeIcon icon={faFileExcel} className='me-2' />
                <span>{translate('export')}</span>
              </Button>
              <Button
                color='primary'
                outline
                onClick={() => {
                  state.setEmployeeBeingEdited(null)
                  state.employeeFormModalState.openModal()
                }}
                className='no-wrap'
                style={{ minWidth: '200px' }}
              >
                <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                <span>{translate(`admin.create_employee`)}</span>
              </Button>
            </div>
          </Col>

          <Table responsive>
            <thead>
              <tr>
                {state.employeesTableColumns.map((column) => (
                  <th key={column.key}>{column.label}</th>
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

      <Modal
        size='lg'
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
