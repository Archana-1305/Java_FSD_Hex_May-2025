import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function DepartmentDetails() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [editDept, setEditDept] = useState(null); // Department being edited
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/department/getAll", {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setDepartments(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getDepartments();
  }, []);

  // Handler for delete department
  const onDelete = async (deptId) => {
    try {
      await axios.delete(`http://localhost:8080/api/department/delete/${deptId}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setDepartments(departments.filter(d => d.id !== deptId));
      setMsg("Department Deleted");
    } catch (err) {
      setMsg("Could not delete department");
    }
  };

  // Handler for showing edit modal
  const onEdit = (dept) => {
    setEditDept({ ...dept }); // clone to avoid direct state mutation
    setShowEditModal(true);
    setMsg("");
  };

  // Handler for saving edited department
  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/department/update/${editDept.id}`,
        editDept,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setDepartments(departments.map(d => d.id === editDept.id ? editDept : d));
      setShowEditModal(false);
      setMsg("Department updated successfully!");
    } catch (err) {
      setMsg("Could not update department");
    }
  };

  return (
    <div className="container mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Departments</h2>
        <Link
          className="btn btn-primary btn-sm"
          to={`/admin/department/add/1`}
        >
          Add Department +
        </Link>
      </div>
      {msg !== "" ? (
        <div className="row">
          <div className="col-lg-12">
            <span style={{ color: msg.includes("success") || msg.includes("Deleted") ? "green" : "red" }}>{msg}</span>
          </div>
        </div>
      ) : null}

      {showEditModal && editDept && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Department</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Department Name</label>
                <input
                  className="form-control mb-2"
                  value={editDept.departmentName}
                  onChange={e => setEditDept({ ...editDept, departmentName: e.target.value })}
                />
                <label>Department Code</label>
                <input
                  className="form-control mb-2"
                  value={editDept.departmentCode}
                  onChange={e => setEditDept({ ...editDept, departmentCode: e.target.value })}
                />
                <label>Description</label>
                <input
                  className="form-control mb-2"
                  value={editDept.description}
                  onChange={e => setEditDept({ ...editDept, description: e.target.value })}
                />
                {/* Add more fields as needed */}
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
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Department Name</th>
              <th>Department Code</th>
              <th>Description</th>
              <th>Created On</th>
              <th>Designations</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {departments.map(dept => (
              <tr key={dept.id}>
                <td>{dept.departmentName}</td>
                <td>{dept.departmentCode}</td>
                <td>{dept.description}</td>
                <td>{dept.createdOn}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/admin/designation/${dept.id}`)}
                  >
                    View Designations
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(dept)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(dept.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DepartmentDetails;