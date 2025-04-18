import Navbar from './components/Navbar';
import { PageLayout } from '../PageLayout';
import { Routes, Route } from 'react-router-dom';
import { EmployeeHomePage } from './pages/employee/EmployeeHomePage.jsx';
import EmployeesPage from "./pages/admin/EmployeesPage.jsx";

function App() {
    return (
        <>
            <Navbar />
            <PageLayout>
                <Routes>
                    <Route path="/employee" element={<EmployeeHomePage />} />
                    <Route path="/admin" element={<EmployeesPage />} />
                </Routes>
            </PageLayout>
        </>
    );
}

export default App;
