import React from "react";
import { useTranslation } from "react-i18next";

import { useTimeEntriesPageState } from "./TimeEntriesPageState.js";
import {
  Row,
  Col,
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import CreateTimeEntryForm from "../../../forms/time-entry/CreateTimeEntryForm.jsx";
import NotificationForm from "../../../forms/time-entry/NotificationForm.jsx";

export const EmployeeTimeEntriesPage = () => {
  const [translate] = useTranslation("global");
  const state = useTimeEntriesPageState();

  const { firstName, lastName, role } = state.timeEntriesData;

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className="d-flex justify-content-between gap-4">
            <h1>
              {firstName} {lastName} - {role}
            </h1>
            <div className="d-flex align-items-center gap-4">
              <Button
                color="primary"
                outline
                onClick={() => state.newTimeEntryFormModalState.openModal({})}
                className="no-wrap"
                style={{ minWidth: '200px' }}
              >
                <span>{translate('time_entry.create_time_entry')}</span>{' '}
              </Button>
            </div>
          </Col>

          {!state.isLoadingTimeEntries && (
            <div className="mt-4">
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    {state.timeEntriesColumns.map((column) => (
                      <th key={column.key}>{column.label}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {state.timeEntriesData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={state.timeEntriesColumns.length}
                        className="text-center"
                      >
                        {translate('no_data')}
                      </td>
                    </tr>
                  ) : (
                    state.timeEntriesData.timeEntries.map((timeEntry) => (
                      <tr key={timeEntry.id}>
                        {state.timeEntriesColumns.map((column) => (
                          <td key={column.key}>
                            {column.type === 'view'
                              ? column.view(timeEntry)
                              : timeEntry[column.key]}
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
        isOpen={state.newTimeEntryFormModalState.isOpen}
        toggle={state.newTimeEntryFormModalState.closeModal}
        returnFocusAfterClose={false}
        size="lg"
      >
        <ModalHeader toggle={state.newTimeEntryFormModalState.closeModal}>
          {translate('time_entry.create_time_entry')}
        </ModalHeader>

        <ModalBody>
          <CreateTimeEntryForm
            onSubmit={state.handleSubmitNewTimeEntry}
            isSubmitting={state.isSubmittingNewTimeEntry}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            color="primary"
            form="newTimeEntryForm"
            disabled={state.isSubmittingNewTimeEntry}
          >
            {translate('create')}
          </Button>

          <Button
            color="secondary"
            onClick={state.newTimeEntryFormModalState.closeModal}
          >
            {translate('cancel')}
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={state.notificationInfoModalState.isOpen}
        toggle={state.notificationInfoModalState.closeModal}
        returnFocusAfterClose={false}
        size="lg"
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
          <Button
            color="secondary"
            onClick={state.notificationInfoModalState.closeModal}
          >
            {translate('close')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
