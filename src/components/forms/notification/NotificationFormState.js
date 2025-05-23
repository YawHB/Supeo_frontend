import { useInput } from '../../../hooks/useInput'

const useNotificationFormState = (notification = {}) => ({
  comment: useInput(notification.comment ?? ''),
  status: useInput(notification.status ?? ''),
  timestamp: useInput(notification.timestamp ?? ''),
})

export default useNotificationFormState

//console.log
