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
