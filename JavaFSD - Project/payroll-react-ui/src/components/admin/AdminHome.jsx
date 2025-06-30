import AdminStatsCard from './AdminStatsCard';
import StatsPieChart from './StatsPieChart';

function AdminHome() {
  return (
    <div>
      <AdminStatsCard />
      <StatsPieChart/>
      {/* Any other dashboard home content here */}
    </div>
  );
}

export default AdminHome;