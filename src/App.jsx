import Navbar from './components/Navbar';
import { PageLayout } from '../PageLayout';
import { Routes, Route } from 'react-router-dom';
import { EmployeeHomePage } from './components/pages/employee/EmployeeHomePage.jsx';
import AdminHomePage from './components/pages/admin/AdminHomePage.jsx';
import EmployeesPage from "./components/pages/admin/EmployeesPage.jsx";

function App() {
    return (
        <>
            <Navbar />
            <PageLayout>
                <Routes>
                    <Route path="/admin" element={<AdminHomePage />} />
                    <Route path="/employee" element={<EmployeeHomePage />} />
                    <Route path='/employees' element={<EmployeesPage />} />
                </Routes>
            </PageLayout>
        </>
    );
}

export default App;
