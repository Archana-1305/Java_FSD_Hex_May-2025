import { useEffect, useState } from "react";
import axios from "axios";

const months = [
  { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
  { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
  { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
  { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" }
];

function RevisePayroll() {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [payslips, setPayslips] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [reRunMsg, setReRunMsg] = useState(""); // for Re-Run result message

  // Fetch departments on mount
  useEffect(() => {
    const getDepartments = async () => {
      try {
        let response = await axios.get("http://localhost:8080/api/department/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setDepartments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setMsg("Failed to load departments.");
      }
    };
    getDepartments();
  }, []);

  const handleGetPayslips = async () => {
    setMsg("");
    setPayslips([]);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/payroll/revise/payslips?month=${month}&year=${year}&departmentId=${departmentId}`,
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
      );
      setPayslips(Array.isArray(res.data) ? res.data : []);
      if (!Array.isArray(res.data) || res.data.length === 0) {
        setMsg("No revise payslip records found for the selected filters.");
      }
    } catch (err) {
      setMsg(
        (typeof err.response?.data === "string" && err.response.data) ||
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to fetch revise payslip records."
      );
    }
    setLoading(false);
  };

  // Re-Run API handler
  const handleReRun = async (row) => {
    setReRunMsg(""); // Clear previous message
    try {
      await axios.post(
        `http://localhost:8080/api/payroll/revise/payslip/${row.id}`,
        {},
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setReRunMsg(`Payslip for employee (ID: ${row.employeeId || row.id}) re-run successfully.`);
      // Optionally refresh payslips
      handleGetPayslips();
    } catch (err) {
      setReRunMsg(
        (typeof err.response?.data === "string" && err.response.data) ||
        err.response?.data?.msg ||
        err.response?.data?.message ||
        "Failed to re-run payslip."
      );
    }
    // auto-hide message after a short delay (optional)
    setTimeout(() => setReRunMsg(""), 4000);
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: 1000,
        margin: "2em auto",
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        className="card"
        style={{
          background: "rgba(25, 27, 42, 0.5)",
          backdropFilter: "blur(8px)",
          borderRadius: "1.5em",
          padding: "1.5em",
          boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
          color: "#fff",
          width: "100%",
          maxWidth: 900,
          minHeight: 400,
          position: "relative",
          overflow: "hidden",
          height: "500px", // smaller card height
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            color: "#6563FF",
            textAlign: "center",
            fontWeight: 700,
            marginBottom: "1.5em",
            flex: "0 0 auto",
          }}
        >
          Revise Payroll Payslips
        </h2>
        {msg && (
          <div
            style={{
              color: msg.toLowerCase().includes("fail") ? "red" : "limegreen",
              textAlign: "center",
              marginBottom: "1em",
              flex: "0 0 auto",
            }}
          >
            {msg}
          </div>
        )}
        {reRunMsg && (
          <div
            style={{
              color: reRunMsg.toLowerCase().includes("success") ? "limegreen" : "red",
              textAlign: "center",
              marginBottom: "1em",
              flex: "0 0 auto",
            }}
          >
            {reRunMsg}
          </div>
        )}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleGetPayslips();
          }}
          style={{ flex: "0 0 auto" }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              flexWrap: "wrap"
            }}
          >
            <div>
              <label style={{ fontWeight: 500 }}>Department</label>
              <select
                className="form-control"
                value={departmentId}
                onChange={e => setDepartmentId(e.target.value)}
                style={{ background: "#181a29", color: "#fff" }}
                required
              >
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.departmentName || `Department #${d.id}`}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 500 }}>Month</label>
              <select
                className="form-control"
                value={month}
                onChange={e => setMonth(Number(e.target.value))}
                style={{ background: "#181a29", color: "#fff" }}
                required
              >
                {months.map(m => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 500 }}>Year</label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={e => setYear(e.target.value)}
                style={{ background: "#181a29", color: "#fff" }}
                required
              />
            </div>
            <div>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={!departmentId || !month || !year || loading}
                style={{
                  minWidth: 90,
                  fontWeight: 600,
                  fontSize: "1.05em",
                  marginTop: 22,
                }}
              >
                {loading ? "Loading..." : "Get"}
              </button>
            </div>
          </div>
        </form>
        {payslips.length > 0 && (
          <div
            style={{
              overflow: "auto",
              flex: "1 1 auto",
              minHeight: 0,
              maxHeight: "270px",
              marginTop: "0.5em",
              borderRadius: "10px",
            }}
          >
            <table
              className="table table-bordered table-hover"
              style={{
                color: "#fff",
                background: "rgba(30,32,52,0.85)",
                borderRadius: 8,
                fontSize: "0.93em",
                minWidth: 800
              }}
            >
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>Employee Name</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Basic Pay</th>
                  <th>HRA</th>
                  <th>DA</th>
                  <th>Special Allowance</th>
                  <th>Medical Allowance</th>
                  <th>LTA</th>
                  <th>Food Coupon</th>
                  <th>Total Monthly Allowances</th>
                  <th>Total Reimbursements</th>
                  <th>PF</th>
                  <th>ESI</th>
                  <th>TDS</th>
                  <th>LOP Deduction</th>
                  <th>Gross Salary</th>
                  <th>Total Deductions</th>
                  <th>Net Pay</th>
                  <th>Working Days</th>
                  <th>Payable Days</th>
                  <th>Generated On</th>
                  <th>Paid On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {payslips.map((p, idx) => (
                  <tr key={idx}>
                    <td>
                      {months.find(m => m.value === p.month)?.label || p.month}
                    </td>
                    <td>{p.employee.employeeCode}</td>
                    <td>{p.employee.first_name}</td>
                    <td>{p.year}</td>
                    <td>{p.basicPay}</td>
                    <td>{p.houseRentAllowance}</td>
                    <td>{p.dearnessAllowance}</td>
                    <td>{p.specialAllowance}</td>
                    <td>{p.medicalAllowance}</td>
                    <td>{p.leaveTravelAllowance}</td>
                    <td>{p.foodCoupon}</td>
                    <td>{p.totalMonthlyAllowances}</td>
                    <td>{p.totalReimbursements}</td>
                    <td>{p.providentFund}</td>
                    <td>{p.employeeStateInsurance}</td>
                    <td>{p.taxDeductedAtSource}</td>
                    <td>{p.lossOfPayDeduction}</td>
                    <td>{p.grossSalary}</td>
                    <td>{p.totalDeductions}</td>
                    <td>{p.netPay}</td>
                    <td>{p.totalWorkingDays}</td>
                    <td>{p.totalPayableDays}</td>
                    <td>
                      {p.generatedOn
                        ? new Date(p.generatedOn).toLocaleString()
                        : ""}
                    </td>
                    <td>
                      {p.paidOn ? new Date(p.paidOn).toLocaleString() : ""}
                    </td>
                    <td>{p.status}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        style={{
                          fontWeight: 600,
                          fontSize: "1em",
                        }}
                        onClick={() => handleReRun(p)}
                      >
                        Re-Run
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RevisePayroll;