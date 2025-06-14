import ErrorPage from './ErrorPage.jsx'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

const ErrorBoundary = ({ children }) => {
  return <ReactErrorBoundary FallbackComponent={ErrorPage}>{children}</ReactErrorBoundary>
}

export default ErrorBoundary
