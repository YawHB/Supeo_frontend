import { toast } from 'react-toastify'

const showToast = (message, type = 'info', options = {}) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: false,
        ...options,
      })
      break
    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: false,
        ...options,
      })
      break
    case 'warn':
      toast.warn(message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: false,
        ...options,
      })
      break
    case 'info':
    default:
      toast.info(message, {
        position: 'top-right',
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: false,
        ...options,
      })
      break
  }
}

export default showToast
