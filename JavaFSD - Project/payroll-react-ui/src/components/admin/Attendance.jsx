import axios from "axios";
import { useEffect, useState } from "react";
import { Paginator } from "primereact/paginator";

const months = [
  { value: 1, label: "January" }, { value: 2, label: "February" }, { value: 3, label: "March" },
  { value: 4, label: "April" }, { value: 5, label: "May" }, { value: 6, label: "June" },
  { value: 7, label: "July" }, { value: 8, label: "August" }, { value: 9, label: "September" },
  { value: 10, label: "October" }, { value: 11, label: "November" }, { value: 12, label: "December" }
];
const ROWS_PER_PAGE = 10;

const mergeEmployeeDetails = (attendance, employees) => {
  return attendance.map(rec => {
    const emp = employees.find(e =>
      e.id === rec.employeeId ||
      e.id === rec.employee_id ||
      e.employeeId === rec.employeeId
    );
    return {
      ...rec,
      employeeName: emp ? (emp.first_name + " " + emp.last_name) : (rec.employeeName || rec.first_name || "") + " " + (rec.last_name || ""),
      employeeCode: emp ? (emp.employeeCode || emp.employee_code || "") : (rec.employeeCode || rec.employee_code || ""),
    };
  });
};

function Attendance() {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [totalWorkingDays, setTotalWorkingDays] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);

  useEffect(() => {
    async function getDepartments() {
      try {
        let response = await axios.get("http://localhost:8080/api/department/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setDepartments(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setMsg("Failed to load departments.");
      }
    }
    getDepartments();
  }, []);

  async function fetchAttendance() {
    if (!departmentId || !month || !year) {
      setMsg("Select department, month, and year.");
      return;
    }
    setLoading(true);
    try {
      let attendanceRes = await axios.get(
        `http://localhost:8080/api/attendance-records/getBulk?departmentId=${departmentId}&month=${month}&year=${year}`,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      let employeesRes = await axios.get(
        `http://localhost:8080/api/employee/getByDepartmentId/${departmentId}`,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setEmployees(employeesRes.data);

      if (attendanceRes.data && attendanceRes.data.length > 0) {
        setAttendanceRecords(mergeEmployeeDetails(attendanceRes.data, employeesRes.data));
        setTotalWorkingDays(attendanceRes.data[0].totalWorkingDays || "");
        setIsFetched(true);
        setMsg("Attendance records found. You can edit.");
        setFirst(0);
      } else {
        setAttendanceRecords(employeesRes.data.map(emp => ({
          employeeId: emp.id,
          employeeName: (emp.first_name || "") + " " + (emp.last_name || ""),
          employeeCode: emp.employeeCode || emp.employee_code || "",
          totalPayableDays: "",
        })));
        setIsFetched(false);
        setMsg("Enter attendance for employees.");
        setFirst(0);
      }
    } catch {
      setAttendanceRecords([]);
      setIsFetched(false);
      setMsg("Failed to load records.");
      setFirst(0);
    }
    setLoading(false);
  }

  function handlePayableDaysChange(idx, val) {
    setAttendanceRecords(records =>
      records.map((rec, i) =>
        i === idx ? { ...rec, totalPayableDays: val } : rec
      )
    );
  }

  async function handleSave(e) {
    e.preventDefault();
    if (!totalWorkingDays) {
      setMsg("Please enter total working days.");
      return;
    }
    for (let rec of attendanceRecords) {
      if (rec.totalPayableDays === "" || isNaN(rec.totalPayableDays)) {
        setMsg("Enter payable days for all employees.");
        return;
      }
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/attendance-records/bulk", {
        departmentId,
        month,
        year,
        totalWorkingDays,
        records: attendanceRecords.map(r => ({
          employeeId: r.employeeId,
          totalPayableDays: r.totalPayableDays
        }))
      }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      setMsg("Attendance saved!");
      setIsFetched(true);
    } catch (err) {
      setMsg(
        
        err.response?.data?.msg ||
       
        "Failed to save attendance."
      );
    }
    setLoading(false);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put("http://localhost:8080/api/attendance-records/bulkUpdate", {
        departmentId,
        month,
        year,
        totalWorkingDays,
        records: attendanceRecords.map(r => ({
          id: r.id,
          employeeId: r.employeeId,
          totalPayableDays: r.totalPayableDays
        }))
      }, { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } });
      setMsg("Attendance updated!");
    } catch {
      setMsg("Failed to update attendance.");
    }
    setLoading(false);
  }

  function onPageChange(event) {
    setFirst(event.first);
  }

  const recordsToDisplay = attendanceRecords.slice(first, first + ROWS_PER_PAGE);

  return (
    <main>
      <div
        className="transparent-card"
        style={{
          background: "#191B2A", // changed to match IncomeTax card
          borderRadius: "2em",
          margin: "2.5em auto",
          padding: "2.3em",
          maxWidth: 950,
          minHeight: 300,
          boxShadow: "0 2px 32px 0 #0003"
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.1rem'
        }}>
          <h2 style={{
            color: "#6563FF",
            fontWeight: 600,
            fontSize: "2rem",
            margin: 0,
            letterSpacing: "0.08em"
          }}>
            Attendance Entry
          </h2>
          <span style={{
            color: "#29e729",
            fontWeight: 600,
            fontSize: "1.15em",
            marginLeft: "1.5em"
          }}>{msg}</span>
        </div>
        <form onSubmit={e => e.preventDefault()} style={{ marginBottom: "2em" }}>
          <div style={{ display: "flex", gap: "1.5em", flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <label style={{ fontWeight: 500, fontSize: "1.1em", marginBottom: 8, display: "block" }}>Department</label>
              <select className="input" style={{ fontSize: "1em", width: "170px" }} value={departmentId} onChange={e => setDepartmentId(e.target.value)}>
                <option value="">Select Department</option>
                {departments.map(dep => (
                  <option key={dep.id} value={dep.id}>{dep.departmentName}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 500, fontSize: "1.1em", marginBottom: 8, display: "block" }}>Month</label>
              <select className="input" style={{ fontSize: "1em", width: "130px" }} value={month} onChange={e => setMonth(e.target.value)}>
                {months.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontWeight: 500, fontSize: "1.1em", marginBottom: 8, display: "block" }}>Year</label>
              <input type="number" className="input" style={{ fontSize: "1em", width: "95px" }} value={year} onChange={e => setYear(e.target.value)} />
            </div>
            <div>
              <label style={{ fontWeight: 500, fontSize: "1.1em", marginBottom: 8, display: "block" }}>Total Working Days</label>
              <input type="number" className="input" style={{ fontSize: "1em", width: "120px" }} value={totalWorkingDays} onChange={e => setTotalWorkingDays(e.target.value)} required />
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <button type="button" style={{
                background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", fontSize: "1.15em",
                padding: "0.3em 1.3em", fontWeight: 500, cursor: "pointer"
              }} onClick={fetchAttendance} disabled={loading}>
                {loading ? "Loading..." : "Fetch"}
              </button>
            </div>
          </div>
        </form>
        <form onSubmit={isFetched ? handleUpdate : handleSave}>
          <table
            className="table table-bordered table-hover"
            style={{
              background: "transparent",
              color: "#fff",
              fontSize: "1.08rem",
              borderRadius: "10px",
              overflow: "hidden",
              marginTop: "1.4em"
            }}
          >
            <thead>
              <tr>
                <th style={{ color: "#6563FF", fontWeight: 700 }}>Employee Name</th>
                <th style={{ color: "#6563FF", fontWeight: 700 }}>Employee Code</th>
                <th style={{ color: "#6563FF", fontWeight: 700 }}>Total Payable Days</th>
              </tr>
            </thead>
            <tbody>
              {recordsToDisplay.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: "center", fontSize: "1.1em", color: "#bbb", padding: "1em" }}>No records found.</td>
                </tr>
              ) : recordsToDisplay.map((rec, idx) => (
                <tr
                  key={rec.employeeId || rec.id || idx + first}
                  style={{
                    background: idx % 2 === 0 ? "#23263A" : "#191B2A",
                    color: "#fff",
                    fontWeight: 500
                  }}
                >
                  <td>{rec.employeeName}</td>
                  <td>{rec.employeeCode}</td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      max={totalWorkingDays || 31}
                      className="input"
                      style={{ fontSize: "1em", width: "90%", padding: "0.2em" }}
                      value={rec.totalPayableDays}
                      onChange={e => handlePayableDaysChange(idx + first, e.target.value)}
                      required
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'center', margin: "1em 0" }}>
            <Paginator
              first={first}
              rows={ROWS_PER_PAGE}
              totalRecords={attendanceRecords.length}
              onPageChange={onPageChange}
              template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }}
            />
          </div>
          <div style={{ textAlign: "right", marginTop: "2em" }}>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              style={{
                background: "#2563eb",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "1.15rem",
                outline: "none",
                boxShadow: "0 2px 8px #1e40af22",
                padding: "0.6em 2.2em"
              }}
              disabled={loading}
            >
              {isFetched ? "Update Attendance" : "Save Attendance"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Attendance;