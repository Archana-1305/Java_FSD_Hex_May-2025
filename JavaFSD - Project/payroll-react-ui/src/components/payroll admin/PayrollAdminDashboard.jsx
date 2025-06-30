import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function PayrollAdminDashboard(){
    return(
        <div className="admin-grid">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="main-inner">
          
          <Outlet />
        </div>
      </div>
    </div>
    )
}
export default PayrollAdminDashboard;