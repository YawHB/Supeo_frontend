import { useTranslation } from 'react-i18next'
import { Row, Col, Table, Input, Button } from 'reactstrap'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTimeEntriesPageState from './adminTimeEntriesPageState.js'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

const statusClassMap = {
  AFVENTER: 'admin-status-select--pending',
  GODKENDT: 'admin-status-select--approve',
  AFVIST: 'admin-status-select--reject',
  IGANG: 'admin-status-select--underway',
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
              {(state.filters.startDate || state.filters.endDate) && (
                <Button
                  color='danger'
                  type='button'
                  onClick={() => state.setFilters({ startDate: '', endDate: '' })}
                  className='reset-filters-text-button'
                >
                  <FontAwesomeIcon icon={faFilter} />
                  <FontAwesomeIcon icon={faX} className='ms-2' />
                </Button>
              )}

              <Input
                id='startDate'
                type='date'
                className='date-filter-input'
                value={state.filters.startDate}
                placeholder={translate('admin.select_start_date')}
                onChange={(e) => state.setFilters({ ...state.filters, startDate: e.target.value })}
              />

              <Input
                id='endDate'
                type='date'
                className='date-filter-input'
                value={state.filters.endDate}
                placeholder={translate('admin.select_end_date')}
                onChange={(e) => state.setFilters({ ...state.filters, endDate: e.target.value })}
              />

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

              <Button outline color='primary' className='no-wrap' onClick={state.handleExportTable}>
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
                          <span className='employee-comment-text' title={timeEntry.comment}>
                            {timeEntry.comment}
                          </span>
                        )}
                      </td>
                      <td
                        onClick={() => {
                          if (timeEntry.notification.status !== 'IGANG') {
                            state.setEditingRowIndex(i)
                          }
                        }}
                      >
                        {state.editingRowIndex === i ? (
                          <input
                            autoFocus
                            className={state.editingRowIndex === i ? 'input-active' : 'input-default'}
                            disabled={timeEntry.notification.status === 'IGANG'}
                            type='text'
                            value={timeEntry.notification.comment}
                            onBlur={() => state.setEditingRowIndex(null)}
                            onChange={(e) => state.handleCommentChange(e.target.value, i)}
                            onClick={() => state.handleInputFieldClick(i)}
                            onKeyUp={(e) => {
                              if (e.key === 'Enter') {
                                state.handleUpdateComment(e.key, i, timeEntry.notification.id)
                                state.setEditingRowIndex(null)
                              } else if (e.key === 'Escape') {
                                state.setEditingRowIndex(null)
                              }
                            }}
                          />
                        ) : timeEntry.notification.comment ? (
                          <span className='comment-text' title={timeEntry.notification.comment}>
                            {timeEntry.notification.comment}
                          </span>
                        ) : timeEntry.notification.status !== 'IGANG' ? (
                          <span className='placeholder-muted clickable-cell'>Tilføj kommentar</span>
                        ) : null}
                      </td>
                      <td>
                        <select
                          disabled={timeEntry.notification.status === 'IGANG'}
                          className={`form-select admin-status-fixed-width ${
                            timeEntry.notification.status !== 'IGANG' ? 'clickable-cell' : ''
                          } ${statusClassMap[timeEntry.notification.status]}`}
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
