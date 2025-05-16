import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout.jsx'
import ErrorBoundary from './components/error/ErrorBoundary.jsx'
import AdminHomePage from './components/pages/admin/AdminHomePage.jsx'
import EmployeeHomePage from './components/pages/employee/EmployeeHomePage.jsx'
import AdminEmployeesPage from './components/pages/admin/AdminEmployeesPage.jsx'
import AdminTimeEntriesPage from './components/pages/admin/AdminTimeEntriesPage.jsx'
import { EmployeeTimeEntriesPage } from './components/pages/employee/EmployeeTimeEntriesPage.jsx'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<AdminEmployeesPage />} />
          <Route path='*' element={<AdminEmployeesPage />} />
          <Route path='/' element={<AdminEmployeesPage />} />
          <Route path='admin' element={<AdminHomePage />} />
          <Route path='employee' element={<EmployeeHomePage />} />
          <Route path='employees' element={<AdminEmployeesPage />} />
          <Route path='timeentries' element={<AdminTimeEntriesPage />} />
          <Route path='employee/time-entries' element={<EmployeeTimeEntriesPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
