import ErrorBoundary from "./components/error/ErrorBoundary.jsx"
import { PageLayout } from '../PageLayout';
import { Routes, Route } from "react-router-dom";
import EmployeeHomePage from "./components/pages/employee/EmployeeHomePage.jsx";
import AdminHomePage from "./components/pages/admin/AdminHomePage.jsx";
import EmployeesPage from "./components/pages/admin/EmployeesPage.jsx";
import TimeEntriesPage from "./components/pages/admin/TimeEntriesPage.jsx";
import { EmployeeTimeEntriesPage } from './components/pages/employee/time-entries/TimeEntriesPage.jsx';

function App() {
  return (
    <>
      <ErrorBoundary>
        <PageLayout>
        <Routes>
          <Route element={<PageLayout />}>
            <Route index element={<TimeEntriesPage />} />
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/employee" element={<EmployeeHomePage />} />
            <Route path="/employee/time-entries" element={<EmployeeTimeEntriesPage />}/>
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/timeentries" element={<TimeEntriesPage />} />
          </Route>
        </Routes>
        </PageLayout>
      </ErrorBoundary>
    </>
  );
}

export default App;
