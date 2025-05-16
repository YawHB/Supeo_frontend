import { useTranslation } from 'react-i18next'
import CreateTimeEntryForm from '../../forms/time-entry/TimeEntryForm.jsx'
import { useTimeEntriesPageState } from './employeeTimeEntriesPageState.js'
import NotificationForm from '../../forms/notification/NotificationForm.jsx'
import { Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export const EmployeeTimeEntriesPage = () => {
  const state = useTimeEntriesPageState()
  const [translate] = useTranslation('global')

  document.title = translate('nav_bar.admin_employees')

  const { firstName, lastName, role } = state.timeEntriesData

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className='d-flex justify-content-between gap-4'>
            <h1>
              {firstName} {lastName} - {role}
            </h1>
            <div className='d-flex align-items-center gap-4'>
              <Button
                color='primary'
                outline
                onClick={() => state.newTimeEntryFormModalState.openModal({})}
                className='no-wrap'
                style={{ minWidth: '200px' }}
              >
                <span>{translate('time_entry.create_time_entry')}</span>{' '}
              </Button>
            </div>
          </Col>

          {!state.isLoadingTimeEntries && (
            <Table responsive>
              <thead>
                <tr>
                  {state.timeEntriesColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {state.timeEntriesData.length === 0 ? (
                  <tr>
                    <td colSpan={state.timeEntriesColumns.length} className='text-center'>
                      {translate('no_data')}
                    </td>
                  </tr>
                ) : (
                  state.timeEntriesData.timeEntries.map((timeEntry) => (
                    <tr key={timeEntry.id}>
                      {state.timeEntriesColumns.map((column) => (
                        <td key={column.key}>
                          {column.type === 'view' ? column.view(timeEntry) : timeEntry[column.key]}
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
        isOpen={state.newTimeEntryFormModalState.isOpen}
        toggle={() => {
          state.resetErrorMessages()
          state.newTimeEntryFormModalState.closeModal()
        }}
        returnFocusAfterClose={false}
        size='lg'
      >
        <ModalHeader
          toggle={() => {
            state.resetErrorMessages()
            state.newTimeEntryFormModalState.closeModal()
          }}
        >
          {translate('time_entry.create_time_entry')}
        </ModalHeader>

        <ModalBody>
          <CreateTimeEntryForm
            onSubmit={state.handleSubmitNewTimeEntry}
            isSubmitting={state.isSubmittingNewTimeEntry}
            errorMessage={state.errorMessages}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            color='primary'
            form='newTimeEntryForm'
            disabled={state.isSubmittingNewTimeEntry}
          >
            {translate('create')}
          </Button>

          <Button
            color='secondary'
            onClick={() => {
              state.resetErrorMessages()
              state.newTimeEntryFormModalState.closeModal()
            }}
          >
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={state.notificationInfoModalState.isOpen}
        toggle={state.notificationInfoModalState.closeModal}
        returnFocusAfterClose={false}
        size='lg'
      >
        <ModalHeader toggle={state.notificationInfoModalState.closeModal}>
          {translate('notification_status', {
            startDate: state.openNotification?.startDate ?? '',
            endDate: state.openNotification?.endDate ?? '',
          })}
        </ModalHeader>

        <ModalBody>
          <NotificationForm
            notification={state.openNotification?.notification}
            //readOnly={true}
          />
        </ModalBody>

        <ModalFooter>
          <Button color='secondary' onClick={state.notificationInfoModalState.closeModal}>
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
