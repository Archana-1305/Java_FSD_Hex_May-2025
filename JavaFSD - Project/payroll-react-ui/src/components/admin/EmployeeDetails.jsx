import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Paginator } from 'primereact/paginator';

function EmployeeDetails() {
  const params = useParams();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [editEmp, setEditEmp] = useState(null); // For modal editing
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Pagination state
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/employee/getByDesignationId/${params.designationId}`,
          {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
          }
        );
        setEmployees(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getEmployees();
  }, [params.designationId]);

  const handleBack = () => {
    navigate(-1);
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  // Delete handler
  const onDelete = async (empId) => {
    try {
      await axios.delete(`http://localhost:8080/api/employee/delete/${empId}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setEmployees(employees.filter(e => e.id !== empId));
      setMsg("Employee deleted.");
    } catch (err) {
      setMsg("Could not delete employee.");
    }
  };

  // Edit handlers
  const onEdit = (emp) => {
    setEditEmp({ ...emp });
    setShowEditModal(true);
    setMsg("");
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/employee/update/${editEmp.id}`,
        editEmp,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setEmployees(employees.map(e => e.id === editEmp.id ? editEmp : e));
      setShowEditModal(false);
      setMsg("Employee updated successfully!");
    } catch (err) {
      setMsg("Could not update employee.");
    }
  };

  return (
    <div className="container mt-4">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <button className="btn btn-secondary" onClick={handleBack}>
          &larr; Back
        </button>
        <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Employees</h2>
        <Link
          to={`/admin/employee/add/${params.departmentId}/${params.designationId}/${params.companyId}`}
        >
          Add Employee +
        </Link>
      </div>
      {msg !== "" ? (
        <div className="row">
          <div className="col-lg-12">
            <span style={{ color: msg.includes("success") || msg.includes("deleted") ? "green" : "red" }}>{msg}</span>
          </div>
        </div>
      ) : null}

      {showEditModal && editEmp && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Employee Code</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.employeeCode}
                  onChange={e => setEditEmp({ ...editEmp, employeeCode: e.target.value })}
                />
                <label>First Name</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.first_name}
                  onChange={e => setEditEmp({ ...editEmp, first_name: e.target.value })}
                />
                <label>Last Name</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.last_name}
                  onChange={e => setEditEmp({ ...editEmp, last_name: e.target.value })}
                />
                <label>Gender</label>
                <select
                  className="form-control mb-2"
                  value={editEmp.gender}
                  onChange={e => setEditEmp({ ...editEmp, gender: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="OTHER">Other</option>
                </select>
                <label>Email</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.email}
                  onChange={e => setEditEmp({ ...editEmp, email: e.target.value })}
                />
                <label>Contact</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.contact}
                  onChange={e => setEditEmp({ ...editEmp, contact: e.target.value })}
                />
                <label>Address</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.address}
                  onChange={e => setEditEmp({ ...editEmp, address: e.target.value })}
                />
                <label>Date of Birth</label>
                <input
                  className="form-control mb-2"
                  type="date"
                  value={editEmp.dob}
                  onChange={e => setEditEmp({ ...editEmp, dob: e.target.value })}
                />
                <label>Employee Type</label>
                <select
                  className="form-control mb-2"
                  value={editEmp.emp_type}
                  onChange={e => setEditEmp({ ...editEmp, emp_type: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
                <label>Date of Joining</label>
                <input
                  className="form-control mb-2"
                  type="date"
                  value={editEmp.date_of_joining}
                  onChange={e => setEditEmp({ ...editEmp, date_of_joining: e.target.value })}
                />
                <label>Date of Leaving</label>
                <input
                  className="form-control mb-2"
                  type="date"
                  value={editEmp.date_of_leaving ?? ""}
                  onChange={e => setEditEmp({ ...editEmp, date_of_leaving: e.target.value })}
                />
                <label>Status</label>
                <select
                  className="form-control mb-2"
                  value={editEmp.status}
                  onChange={e => setEditEmp({ ...editEmp, status: e.target.value })}
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
                <label>CTC Amount</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={editEmp.ctcAmount}
                  onChange={e => setEditEmp({ ...editEmp, ctcAmount: e.target.value })}
                />
                <label>Bank Name</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.bankName}
                  onChange={e => setEditEmp({ ...editEmp, bankName: e.target.value })}
                />
                <label>Account Number</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.accountNumber}
                  onChange={e => setEditEmp({ ...editEmp, accountNumber: e.target.value })}
                />
                <label>IFSC Code</label>
                <input
                  className="form-control mb-2"
                  value={editEmp.ifscCode}
                  onChange={e => setEditEmp({ ...editEmp, ifscCode: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleEditSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Scrollable table wrapper */}
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table className="table table-bordered table-hover" style={{ minWidth: "1300px" }}>
              <thead>
                <tr>
                  <th>Employee Code</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Date of Birth</th>
                  <th>Employee Type</th>
                  <th>Date of Joining</th>
                  <th>Date of Leaving</th>
                  <th>Status</th>
                  <th>CTC Amount</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>IFSC Code</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(employees) && employees.slice(first, first + rows).map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.employeeCode}</td>
                    <td>{emp.first_name}</td>
                    <td>{emp.last_name}</td>
                    <td>{emp.gender}</td>
                    <td>{emp.email}</td>
                    <td>{emp.contact}</td>
                    <td>{emp.address}</td>
                    <td>{emp.dob}</td>
                    <td>{emp.emp_type}</td>
                    <td>{emp.date_of_joining}</td>
                    <td>{emp.date_of_leaving ?? "-"}</td>
                    <td>{emp.status}</td>
                    <td>{emp.ctcAmount}</td>
                    <td>{emp.bankName}</td>
                    <td>{emp.accountNumber}</td>
                    <td>{emp.ifscCode}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => onEdit(emp)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => onDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginator below the table */}
          <div style={{ marginTop: 16 }}>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={employees.length}
              rowsPerPageOptions={[10, 20, 30]}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default EmployeeDetails;