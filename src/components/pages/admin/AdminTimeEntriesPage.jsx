import { useTranslation } from 'react-i18next'
import { Row, Col, Table, Button } from 'reactstrap'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTimeEntriesPageState from './adminTimeEntriesPageState.js'

const statusClassMap = {
  AFVENTER: 'status-select--pending',
  GODKENDT: 'status-select--approve',
  AFVIST: 'status-select--reject',
  IGANG: 'status-select--underway',
}

const AdminTimeEntriesPage = () => {
  const state = useTimeEntriesPageState()
  const [translate] = useTranslation('global')

  document.title = translate('page_title.administration_time_entries')

  return (
    <>
      <Row>
        <Col>
          <Col xs={12} className='d-flex justify-content-between gap-4'>
            <h1>{translate('nav_bar.admin_time_entries')}</h1>
            <div className='d-flex align-items-center gap-4'>
              <Button outline color='primary' onClick={state.handleExportTable}>
                <FontAwesomeIcon icon={faFileExcel} className='me-2' />
                <span>{translate('export')}</span>
              </Button>
            </div>
          </Col>

          {!state.isLoadingTimeEntries && (
            <Table responsive>
              <thead>
                <tr>
                  {state.timeEntriesTableColumns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {state.timeEntries.length === 0 ? (
                  <tr>
                    <td colSpan={state.timeEntriesTableColumns.length} className='text-center'>
                      {translate('no_data')}
                    </td>
                  </tr>
                ) : (
                  state.timeEntries.map((timeEntry, i) => (
                    <tr key={timeEntry.id}>
                      <td>{timeEntry.id}</td>
                      <td>{timeEntry.employee.firstName}</td>
                      <td>{timeEntry.employee.lastName}</td>
                      <td>{timeEntry.startDate}</td>
                      <td>{timeEntry.startTime}</td>
                      <td>{timeEntry.endDate}</td>
                      <td>{timeEntry.endTime}</td>
                      <td>{timeEntry.duration}</td>
                      <td>
                        {timeEntry.comment && (
                          // title giver hover over text
                          <span className='employee-comment-text' title={timeEntry.comment}>
                            {timeEntry.comment}
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          autoFocus // Det gør så musepilen står klar på input-feltet
                          className={state.editingRowIndex === i ? 'input-active' : 'input-default'}
                          disabled={timeEntry.notification.status === 'IGANG'}
                          type='text'
                          value={timeEntry.notification.comment}
                          onChange={(e) => state.handleCommentChange(e.target.value, i)}
                          onClick={() => state.handleInputFieldClick(i)}
                          onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                              state.handleUpdateComment(e.key, i, timeEntry.notification.id)
                              state.setEditingRowIndex(null) // Når Enter trykkes, opdater kommentaren og afslut redigering
                            } else if (e.key === 'Escape') {
                              state.setEditingRowIndex(null) // Når Escape trykkes, annuller redigering uden at gemme og afslut redigering
                            }
                          }}
                        />
                      </td>
                      <td>
                        <select
                          disabled={timeEntry.notification.status === 'IGANG'}
                          className={`form-select clickable-cell ${
                            statusClassMap[timeEntry.notification.status]
                          } `}
                          value={timeEntry.notification.status}
                          onChange={(e) =>
                            state.handleStatusChange(e.target.value, i, timeEntry.notification.id)
                          }
                        >
                          {state.timeEntriesTableColumns[10].options
                            .filter((option) =>
                              timeEntry.notification.status === 'IGANG'
                                ? option.value === 'IGANG'
                                : option.value !== 'IGANG',
                            )
                            .map((option) => (
                              <option key={option.label} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      </td>

                      {/* {column.key === 'status' ? (
                                <select
                                  //className={`form-select ${statusClassMap[timeEntry.status] || ''}`}
                                  className={`form-select ${
                                    statusClassMap[timeEntry.notification.status] || ''
                                  }`}
                                  //value={timeEntry.status}
                                  value={timeEntry.notification.status}
                                  onChange={(e) =>
                                    state.handleStatusChange(
                                      timeEntry.notification.id,
                                      e.target.value,
                                    )
                                  }
                                >
                                  {column.options?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              ) : column.key === 'admin_comment' ? (
                                timeEntry.notification.comment
                                ) : column.key === 'firstName' ? (
                                  timeEntry.employee?.firstName
                                  ) : column.key === 'lastName' ? (
                                    timeEntry.employee?.lastName
                                    ) : (
                                      timeEntry[column.key]
                                      )}  */}
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default AdminTimeEntriesPage
