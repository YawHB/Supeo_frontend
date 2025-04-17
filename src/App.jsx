import Navbar from './components/Navbar';
import { PageLayout } from '../PageLayout';
import { Routes, Route } from 'react-router-dom';
import { EmployeeHomePage } from './pages/employee/EmployeeHomePage.jsx';
import { EmployeeListPage } from './pages/admin/EmployeeListPage.jsx';
function App() {
    return (
        <>
            <Navbar />
            <PageLayout>
                <Routes>
                    <Route path="/employee" element={<EmployeeHomePage />} />
                    <Route path="/admin" element={<EmployeeListPage />} />
                </Routes>
            </PageLayout>
        </>
    );
}

export default App;
