import React from 'react'
import SideBar from '../../../sidebar/Sidebar'
import { Row, Col, Table, Button } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import useSideBarState from '../../../sidebar/SideBarState'
import useTimeEntriesPageState from './TimeEntriesPageState'
import { faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const statusClassMap = {
  AFVENTER: 'status-select--pending',
  GODKENDT: 'status-select--approve',
  AFVIST: 'status-select--reject',
  IGANG: 'status-select--underway',
}

const TimeEntriesPage = () => {
  const [translate] = useTranslation('global')
  const state = useTimeEntriesPageState()
  const sideBarState = useSideBarState()

  document.title = translate('page_title.administration_time_entries')

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
                  state.timeEntries.map((timeEntry) => {
                    //  timeEntry.map((x) => {
                    //    console.log(x)
                    //  })

                    return (
                      <tr key={timeEntry.id}>
                        {state.timeEntriesTableColumns.map((column) => {
                          return (
                            <td key={column.key}>
                              {column.key === 'status' ? (
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
                              ) : (
                                timeEntry[column.key]
                              )}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default TimeEntriesPage
