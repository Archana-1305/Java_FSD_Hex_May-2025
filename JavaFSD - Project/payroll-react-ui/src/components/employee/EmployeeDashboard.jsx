import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { fetchAllPayslips } from "../../store/actions/PayslipAction";
//import '../../css/employee.css';

function EmployeeDashboard() {
    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllPayslips(dispatch)();
    }, [dispatch]);

    return (
        <div className="admin-grid">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="main-inner">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;