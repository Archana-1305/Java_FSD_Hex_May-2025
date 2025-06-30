import { useEffect, useState } from "react";
import axios from "axios";

const months = [
  { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
  { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
  { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
  { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" }
];

function RunPayroll() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [policies, setPolicies] = useState([]);
  const [policyId, setPolicyId] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch payroll policies
  useEffect(() => {
    const getPolicies = async () => {
      try {
        let response = await axios.get("http://localhost:8080/api/payroll-policy/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setPolicies(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setMsg("Failed to load payroll policies.");
        setIsSuccess(false);
      }
    };
    getPolicies();
  }, []);

  // Fetch departments
  useEffect(() => {
    const getDepartments = async () => {
      try {
        let response = await axios.get("http://localhost:8080/api/department/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setDepartments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setMsg("Failed to load departments.");
        setIsSuccess(false);
      }
    };
    getDepartments();
  }, []);

  const handleRunPayroll = async () => {
    setMsg("");
    setIsSuccess(false);
    try {
      await axios.post(
        `http://localhost:8080/api/payroll/run-by-department?month=${month}&year=${year}&policyId=${policyId}&departmentId=${departmentId}`,
        {},
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
      );
      setMsg("Payroll run successfully!");
      setIsSuccess(true);
    } catch (err) {
      setMsg(
        (typeof err.response?.data === "string" && err.response.data) ||
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to run payroll."
      );
      setIsSuccess(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: 600, margin: "2em auto" }}>
      <div className="card" style={{ background: "rgba(25, 27, 42, 0.5)", backdropFilter: "blur(8px)", borderRadius: "1.5em", padding: "2em", boxShadow: "0 2px 32px rgba(0,0,0,0.2)", color: "#fff" }}>
        <h2 style={{ color: "#6563FF", textAlign: "center", fontWeight: 700, marginBottom: "1.5em" }}>Run Payroll</h2>
        {msg && (
          <div
            style={{
              color: isSuccess ? "limegreen" : "red",
              textAlign: "center",
              marginBottom: "1em"
            }}
          >
            {msg}
          </div>
        )}
        <form onSubmit={e => e.preventDefault()}>
          <div className="mb-4">
            <label style={{ fontWeight: 500 }}>Month</label>
            <select className="form-control" value={month} onChange={e => setMonth(Number(e.target.value))} style={{ background: "#181a29", color: "#fff" }}>
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label style={{ fontWeight: 500 }}>Year</label>
            <input type="number" className="form-control" value={year} onChange={e => setYear(e.target.value)} style={{ background: "#181a29", color: "#fff" }} />
          </div>
          <div className="mb-4">
            <label style={{ fontWeight: 500 }}>Payroll Policy</label>
            <select
              className="form-control"
              value={policyId}
              onChange={e => setPolicyId(e.target.value)}
              style={{ background: "#181a29", color: "#fff" }}
            >
              <option value="">Select Policy</option>
              {policies.map(p => (
                <option key={p.id} value={p.id}>
                  {p.policyName || p.name || `Policy #${p.id}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label style={{ fontWeight: 500 }}>Department</label>
            <select
              className="form-control"
              value={departmentId}
              onChange={e => setDepartmentId(e.target.value)}
              style={{ background: "#181a29", color: "#fff" }}
            >
              <option value="">Select Department</option>
              {departments.map(d => (
                <option key={d.id} value={d.id}>
                  {d.departmentName || `Department #${d.id}`}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 24 }}>
            <button
              className="btn btn-success"
              onClick={handleRunPayroll}
              type="button"
              disabled={!month || !year || !policyId || !departmentId}
              style={{ minWidth: 120, fontWeight: 600, fontSize: "1.1em" }}
            >
              Run Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RunPayroll;