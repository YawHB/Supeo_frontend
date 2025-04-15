import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { EmployeeHomePage } from './components/pages/EmployeeHomePage';
import { AdminHomePage } from './components/pages/AdminHomePage';
function App() {
    return (
        <>
            <>
                <Navbar />
                <Routes>
                    <Route path="/employee" element={<EmployeeHomePage />} />
                    <Route path="/admin" element={<AdminHomePage />} />
                </Routes>
            </>
        </>
    );
}

export default App;
