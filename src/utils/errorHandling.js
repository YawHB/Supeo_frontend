import { isDev } from './config.js'
import showToast from '../utils/toast.js'

export const standardApolloError = (query, error, translate) => {
  if (isDev()) {
    showToast(`${query}: ${String(error)}`, {
      type: `error`,
      autoClose: false,
      position: `top-right`,
      title: translate(`errors.error`),
    })
  } else {
    showToast(
      translate(`errors.no_response_from_server`, {
        type: `error`,
        autoClose: true,
        position: `top-right`,
        title: translate(`errors.error`),
      }),
    )
  }
}

export const handleMemberAuthError = (error, navigate) => {
  const isForbidden = error?.graphQLErrors?.find((err) => err.extensions?.code === 'IKKE_AUTENTIFICERET')
  if (isForbidden) navigate('/employee/time-entries')
}
export const handleAdminManagerAuthError = (error, navigate) => {
  const isForbidden = error?.graphQLErrors?.find((err) => err.extensions?.code === 'IKKE_AUTENTIFICERET')
  if (isForbidden) navigate('/admin/time-entries')
}
