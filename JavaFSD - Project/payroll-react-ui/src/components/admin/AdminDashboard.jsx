import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AdminStatsCard from './AdminStatsCard';
import '../../css/admin.css';

function AdminDashboard() {
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

export default AdminDashboard;