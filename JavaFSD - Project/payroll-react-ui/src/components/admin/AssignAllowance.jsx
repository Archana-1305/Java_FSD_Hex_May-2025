import { useEffect, useState } from "react";
import axios from "axios";

function AssignAllowance() {
  const [employees, setEmployees] = useState([]);
  const [allowances, setAllowances] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search/filter state
  const [search, setSearch] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAllowanceId, setSelectedAllowanceId] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");
  const [calcResult, setCalcResult] = useState(null); // Use object, not string

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const empRes = await axios.get("http://localhost:8080/api/employee/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setEmployees(empRes.data);

        const allowRes = await axios.get("http://localhost:8080/api/allowance/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setAllowances(allowRes.data);
      } catch (err) {
        setMsg("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  // Filter employees by search
  const filteredEmployees = employees.filter(emp =>
    (emp.first_name && emp.first_name.toLowerCase().includes(search.toLowerCase())) ||
    (emp.employeeCode && emp.employeeCode.toLowerCase().includes(search.toLowerCase())) ||
    (emp.department && emp.department.toLowerCase().includes(search.toLowerCase())) ||
    (emp.designation && emp.designation.toLowerCase().includes(search.toLowerCase()))
  );

  // Open allowance modal
  const openAllowanceModal = (employee) => {
    setSelectedEmployee(employee);
    setSelectedAllowanceId("");
    setMonth("");
    setYear("");
    setAmount("");
    setMsg("");
    setCalcResult(null);
    setShowModal(true);
  };

  // Assign Allowance
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedAllowanceId || !month || !year || !amount) {
      setMsg("All fields are required.");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8080/api/employeeAllowance/assign/${selectedEmployee.id}/${selectedAllowanceId}`,
        { month: Number(month), year: Number(year), amount: Number(amount) },
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setMsg("Allowance assigned successfully!");
    } catch (err) {
      setMsg("Failed to assign allowance.");
    }
  };

  // Calculate button
  const handleCalculate = async () => {
    if (!month || !year) {
      setCalcResult({ error: "Please enter month and year" });
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8080/api/employee-monthly-allowance/calculate/${selectedEmployee.id}?month=${month}&year=${year}`,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setCalcResult(res.data);
    } catch (err) {
      setCalcResult({ error: "Failed to calculate." });
    }
  };

  // Helper for pretty calculation result
  const renderCalcResult = () => {
    if (!calcResult) return null;
    if (calcResult.error) {
      return <span style={{ color: "red", marginLeft: 8 }}>{calcResult.error}</span>;
    }
    // Render each key-value pair nicely
    return (
      <div style={{ marginTop: 8, color: "green" }}>
        {Object.entries(calcResult).map(([key, value]) => (
          <div key={key}><b>{key.replace(/_/g, " ")}:</b> {String(value)}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <style>{`
        .modal-label {
          color: #232323 !important;
          font-weight: 700;
          font-size: 1.05rem;
          opacity: 1 !important;
          margin-bottom: 0.35rem;
          letter-spacing: 0.01em;
        }
      `}</style>
      <h2>Assign Allowance</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by name, code, department, designation..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 320, padding: 8, borderRadius: 5, border: "1px solid #333" }}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table className="table table-bordered table-hover" style={{ minWidth: "900px" }}>
            <thead>
              <tr>
                <th>Employee Code</th>
                <th>First Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.employeeCode}</td>
                  <td>{emp.first_name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => openAllowanceModal(emp)}>
                      Provide Allowance
                    </button>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Allowance Modal */}
      {showModal && selectedEmployee && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleAssign}>
                <div className="modal-header">
                  <h5 className="modal-title" style={{ color: "#232323", fontWeight: 700 }}>
                    Assign Allowance to {selectedEmployee.first_name} ({selectedEmployee.employeeCode})
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="modal-label">Allowance</label>
                  <select className="form-control mb-2" value={selectedAllowanceId} onChange={e => setSelectedAllowanceId(e.target.value)} required>
                    <option value="">Select Allowance</option>
                    {allowances.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                  <label className="modal-label">Month (1-12)</label>
                  <input className="form-control mb-2" type="number" min={1} max={12} value={month || ""} onChange={e => setMonth(e.target.value)} required />
                  <label className="modal-label">Year</label>
                  <input className="form-control mb-2" type="number" value={year || ""} onChange={e => setYear(e.target.value)} required />
                  <label className="modal-label">Amount</label>
                  <input className="form-control mb-2" type="number" value={amount || ""} onChange={e => setAmount(e.target.value)} required />
                  {msg && <div style={{ color: msg.includes("success") ? "green" : "red", marginBottom: 8 }}>{msg}</div>}
                  <button type="button" className="btn btn-secondary" onClick={handleCalculate} style={{ marginRight: 8 }}>
                    Calculate
                  </button>
                  {renderCalcResult()}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AssignAllowance;