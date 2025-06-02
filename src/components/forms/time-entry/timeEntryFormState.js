import { useEffect } from 'react'
import { useInput } from '../../../hooks/useInput.js'
import { calculateWorkHours } from '../../../utils/calculateWorkHours.js'
import { reverseString } from '../../../utils/reverseDateString.js'
import { AuthContext } from '../../context/authContext.js'
import { useContext } from 'react'

const useTimeEntryFormState = (timeEntry) => {
  const { user } = useContext(AuthContext)
  const startDate = useInput(timeEntry?.startDate ? reverseString(timeEntry.startDate) : '')
  const startTime = useInput(timeEntry?.startTime ?? '')
  const endDate = useInput(timeEntry?.endDate ? reverseString(timeEntry.endDate) : '')
  const endTime = useInput(timeEntry?.endTime ?? '')
  const duration = useInput('')
  const notificationStatus = useInput(timeEntry?.notification?.status ?? 'AFVENTER')

  useEffect(() => {
    if (isTimeRangeComplete(startDate.value, startTime.value, endDate.value, endTime.value)) {
      const result = calculateWorkHours(startDate.value, startTime.value, endDate.value, endTime.value)
      duration.onChange({ target: { value: result } })
    }
  }, [startDate.value, startTime.value, endDate.value, endTime.value])

  useEffect(() => {
    if (isEndDateTimeComplete(endDate.value, endTime.value)) {
      notificationStatus.onChange({ target: { value: 'AFVENTER' } })
    } else {
      notificationStatus.onChange({ target: { value: 'IGANG' } })
    }
  }, [startDate.value, startTime.value, endDate.value, endTime.value])

  return {
    startDate,
    startTime,
    endDate,
    endTime,
    duration,
    break: useInput(timeEntry?.break ?? ''),
    comment: useInput(timeEntry?.comment ?? ''),
    adminComment: useInput(timeEntry?.adminComment ?? ''),
    employeeID: useInput(user?.employee_id ?? ''),
    notification: {
      comment: useInput(timeEntry?.notification?.comment ?? ''),
      timestamp: useInput(Date.now()),
      status: notificationStatus,
    },
  }
}

function isTimeRangeComplete(startDate, startTime, endDate, endTime) {
  return startDate && startTime && endDate && endTime
}

function isEndDateTimeComplete(endDate, endTime) {
  return endDate && endTime ? true : false
}
export default useTimeEntryFormState
