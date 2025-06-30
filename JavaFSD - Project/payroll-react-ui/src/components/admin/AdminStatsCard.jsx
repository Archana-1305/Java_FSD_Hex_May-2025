import { useEffect, useState } from "react";
import axios from "axios";

function AdminStatsCard() {
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [deptRes, desigRes, empRes] = await Promise.all([
          axios.get("http://localhost:8080/api/department/getAll", {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
          }),
          axios.get("http://localhost:8080/api/designation/getAll", {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
          }),
          axios.get("http://localhost:8080/api/employee/getAll", {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
          })
        ]);
        setDepartments(deptRes.data);
        setDesignations(desigRes.data);
        setEmployees(empRes.data);
      } catch (err) {
        setDepartments([]);
        setDesignations([]);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading stats...</div>;

  return (
    <div
      className="location-card"
      style={{
        background: "rgba(40, 49, 101, 0.5)",
        backdropFilter: "blur(8px)",
        borderRadius: "1.5em",
        margin: "1.5em auto",
        padding: "2em",
        maxWidth: 900,
        boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
        color: "#fff"
      }}
    >
      <div style={{
        display: 'flex',
        gap: "2em",
        justifyContent: "center"
      }}>
        <StatCard label="Total Employees" value={employees.length} />
        <StatCard label="Total Departments" value={departments.length} />
        <StatCard label="Total Designations" value={designations.length} />
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "rgba(35, 62, 235, 0.38)", // transparent dark
        backdropFilter: "blur(8px)",
        color: "#7e7bff", // soft purple-blue
        borderRadius: "1em",
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        padding: "2em 2.5em",
        minWidth: "210px",
        textAlign: "center",
        flex: "1"
      }}
    >
      <h3 style={{
        fontWeight: 600,
        fontSize: "1.45em",
        marginBottom: ".6em"
      }}>{label}</h3>
      <div style={{
        fontSize: "2.7em",
        fontWeight: 700,
        letterSpacing: 2
      }}>{value}</div>
    </div>
  );
}

export default AdminStatsCard;