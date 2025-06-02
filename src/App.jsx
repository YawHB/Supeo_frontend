import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout.jsx'
import ErrorBoundary from './components/error/ErrorBoundary.jsx'
import AdminHomePage from './components/pages/admin/AdminHomePage.jsx'
import EmployeeHomePage from './components/pages/employee/EmployeeHomePage.jsx'
import AdminEmployeesPage from './components/pages/admin/AdminEmployeesPage.jsx'
import AdminTimeEntriesPage from './components/pages/admin/AdminTimeEntriesPage.jsx'
import { EmployeeTimeEntriesPage } from './components/pages/employee/EmployeeTimeEntriesPage.jsx'
import { LoginPage } from './components/pages/LoginPage.jsx'

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route element={<PageLayout />}>
          <Route path='admin/home' element={<AdminHomePage />} />
          <Route path='admin/employees' element={<AdminEmployeesPage />} />
          <Route path='admin/time-entries' element={<AdminTimeEntriesPage />} />
          <Route path='employee/home' element={<EmployeeHomePage />} />
          <Route path='employee/time-entries' element={<EmployeeTimeEntriesPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default App
