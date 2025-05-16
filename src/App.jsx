import PageLayout from './components/PageLayout.jsx'
import { Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/error/ErrorBoundary.jsx'
import AdminHomePage from './components/pages/admin/AdminHomePage.jsx'
import EmployeesPage from './components/pages/admin/AdminEmployeesPage.jsx'
import TimeEntriesPage from './components/pages/admin/AdminTimeEntriesPage.jsx'
import EmployeeHomePage from './components/pages/employee/home/EmployeeHomePage.jsx'
import { EmployeeTimeEntriesPage } from './components/pages/employee/time-entries/EmployeeTimeEntriesPage.jsx'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<EmployeesPage />} />
          <Route path='*' element={<EmployeesPage />} />
          <Route path='/' element={<EmployeesPage />} />
          <Route path='admin' element={<AdminHomePage />} />
          <Route path='employee' element={<EmployeeHomePage />} />
          <Route path='employee/time-entries' element={<EmployeeTimeEntriesPage />} />
          <Route path='employees' element={<EmployeesPage />} />
          <Route path='timeentries' element={<TimeEntriesPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
