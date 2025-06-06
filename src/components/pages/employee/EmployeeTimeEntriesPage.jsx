import { useTranslation } from 'react-i18next'
import TimeEntryForm from '../../forms/time-entry/TimeEntryForm.jsx'
import { useTimeEntriesPageState } from './employeeTimeEntriesPageState.js'
import NotificationForm from '../../forms/notification/NotificationForm.jsx'
import { Row, Col, Table, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faClock } from '@fortawesome/free-solid-svg-icons'

export const EmployeeTimeEntriesPage = () => {
  const state = useTimeEntriesPageState()
  const [translate] = useTranslation('global')

  document.title = translate('nav_bar.admin_employees')

  const { firstName, lastName } = state.timeEntriesData

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className='d-flex justify-content-between gap-4'>
            <h1>
              {firstName} {lastName}
            </h1>
            <div className='d-flex align-items-center gap-4'>
              <Input
                className='time-entry-search-input'
                value={state.searchInput.value}
                onChange={state.searchInput.onChange}
                placeholder={translate('admin.search_time_entry')}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    state.searchInput.onChange({ target: { value: '' } })
                  }
                }}
              />
              <Button
                outline
                color='primary'
                className='no-wrap'
                onClick={() => state.timeEntryFormModalState.openModal({})}
              >
                <FontAwesomeIcon icon={faClock} className='me-2' />
                <span>{translate('time_entry.create_time_entry')}</span>{' '}
              </Button>
            </div>
          </Col>

          {!state.isLoadingTimeEntries && (
            <Table responsive>
              <thead>
                <tr>
                  {state.timeEntriesColumns.map((column) => (
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
                {state.timeEntriesData.length === 0 ? (
                  <tr>
                    <td colSpan={state.timeEntriesColumns.length} className='text-center'>
                      {translate('no_data')}
                    </td>
                  </tr>
                ) : (
                  state.timeEntriesData.timeEntries.map((timeEntry) => {
                    return (
                      <tr key={timeEntry.id}>
                        {state.timeEntriesColumns.map((column) => (
                          <td key={`${timeEntry.id}-${column.key}`}>
                            {column.type === 'view' ? column.view(timeEntry) : timeEntry[column.key]}
                          </td>
                        ))}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      <Modal
        size='md'
        isOpen={state.timeEntryFormModalState.isOpen}
        toggle={() => {
          state.resetErrorMessages()
          state.timeEntryBeingEdited ? state.setTimeEntryBeingEdited(null) : null
          state.timeEntryFormModalState.closeModal()
        }}
        returnFocusAfterClose={false}
      >
        <ModalHeader
          toggle={() => {
            state.resetErrorMessages()
            state.setTimeEntryBeingEdited(null)
            state.timeEntryFormModalState.closeModal()
          }}
        >
          {state.timeEntryBeingEdited
            ? translate('time_entry.edit_time_entry')
            : translate('time_entry.create_time_entry')}
        </ModalHeader>

        <ModalBody>
          <TimeEntryForm
            timeEntry={state.timeEntryBeingEdited}
            onSubmit={
              state.timeEntryBeingEdited
                ? state.handleSubmitEditedTimeEntry
                : state.handleSubmitNewTimeEntry
            }
            errorMessages={state.errorMessages}
            isSubmitting={state.isLoadingTimeEntriesForm}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            color='primary'
            form='timeEntryForm'
            disabled={state.isLoadingTimeEntriesForm}
          >
            <FontAwesomeIcon icon={faSave} className='me-2' />
            {state.timeEntryBeingEdited ? translate('save') : translate('create')}
          </Button>
          <Button
            color='secondary'
            onClick={() => {
              state.timeEntryFormModalState.closeModal()
              state.resetErrorMessages()
              state.setTimeEntryBeingEdited(null)
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
        size='md'
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
          />
        </ModalBody>

        <ModalFooter>
          <Button color='secondary' onClick={state.notificationInfoModalState.closeModal}>
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={state.deleteModalOpen}
        toggle={() => state.setDeleteModalOpen(false)}
        returnFocusAfterClose={false}
      >
        <ModalHeader toggle={() => state.setDeleteModalOpen(false)}>
          {translate('time_entry.delete_time_entry')}
        </ModalHeader>
        <ModalBody>{translate('time_entry.delete_time_entry_text')}</ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={() => state.setDeleteModalOpen(false)}>
            {translate('cancel')}
          </Button>
          <Button
            color='danger'
            onClick={() => {
              state.deleteTimeEntry({ variables: { id: state.entryToDelete.id } })
              state.setDeleteModalOpen(false)
            }}
          >
            {translate('delete')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
