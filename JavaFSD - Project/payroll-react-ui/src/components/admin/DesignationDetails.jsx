import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function DesignationDetails() {
  const { deptId } = useParams();
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [editDesig, setEditDesig] = useState(null); // For modal editing
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/designation/getByDepartmentId/${deptId}`,
          {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
          }
        );
        setDesignations(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getDesignations();
  }, [deptId]);

  // Delete handler
  const onDelete = async (desigId) => {
    try {
      await axios.delete(`http://localhost:8080/api/designation/delete/${desigId}`, {
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      });
      setDesignations(designations.filter(d => d.id !== desigId));
      setMsg("Designation deleted.");
    } catch (err) {
      setMsg("Could not delete designation.");
    }
  };

  // Edit handlers
  const onEdit = (desig) => {
    setEditDesig({ ...desig });
    setShowEditModal(true);
    setMsg("");
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/designation/update/${editDesig.id}`,
        editDesig,
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setDesignations(designations.map(d => d.id === editDesig.id ? editDesig : d));
      setShowEditModal(false);
      setMsg("Designation updated successfully!");
    } catch (err) {
      setMsg("Could not update designation.");
    }
  };

  // Back button handler
  const handleBack = () => {
    navigate(-1); 
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
        <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Designations</h2>
        <Link
          className="btn btn-warning btn-sm"
          to={`/admin/designation/add/${deptId}`}
        >
          Add Designation +
        </Link>
      </div>
      {msg !== "" ? (
        <div className="row">
          <div className="col-lg-12">
            <span style={{ color: msg.includes("success") || msg.includes("deleted") ? "green" : "red" }}>{msg}</span>
          </div>
        </div>
      ) : null}

      {showEditModal && editDesig && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.3)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Designation</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <label>Designation Name</label>
                <input
                  className="form-control mb-2"
                  value={editDesig.designationName}
                  onChange={e => setEditDesig({ ...editDesig, designationName: e.target.value })}
                />
                <label>Designation Code</label>
                <input
                  className="form-control mb-2"
                  value={editDesig.designationCode}
                  onChange={e => setEditDesig({ ...editDesig, designationCode: e.target.value })}
                />
                <label>Description</label>
                <input
                  className="form-control mb-2"
                  value={editDesig.description}
                  onChange={e => setEditDesig({ ...editDesig, description: e.target.value })}
                />
                <label>Full-Time Allowed</label>
                <select
                  className="form-control mb-2"
                  value={editDesig.isFullTimeAllowed ? "yes" : "no"}
                  onChange={e => setEditDesig({ ...editDesig, isFullTimeAllowed: e.target.value === "yes" })}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                <label>Min Full-Time CTC</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={editDesig.minFullTimeCtc ?? ""}
                  onChange={e => setEditDesig({ ...editDesig, minFullTimeCtc: e.target.value })}
                />
                <label>Max Full-Time CTC</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={editDesig.maxFullTimeCtc ?? ""}
                  onChange={e => setEditDesig({ ...editDesig, maxFullTimeCtc: e.target.value })}
                />
                <label>Min Part-Time CTC</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={editDesig.minPartTimeCtc ?? ""}
                  onChange={e => setEditDesig({ ...editDesig, minPartTimeCtc: e.target.value })}
                />
                <label>Max Part-Time CTC</label>
                <input
                  className="form-control mb-2"
                  type="number"
                  value={editDesig.maxPartTimeCtc ?? ""}
                  onChange={e => setEditDesig({ ...editDesig, maxPartTimeCtc: e.target.value })}
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
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table className="table table-bordered table-hover" style={{ minWidth: "1200px" }}>
            <thead>
              <tr>
                <th>Designation Name</th>
                <th>Designation Code</th>
                <th>Description</th>
                <th>Full-Time Allowed</th>
                <th>Min Full-Time CTC</th>
                <th>Max Full-Time CTC</th>
                <th>Min Part-Time CTC</th>
                <th>Max Part-Time CTC</th>
                <th>Created On</th>
                <th>Employees</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(designations) && designations.map(desig => (
                <tr key={desig.id}>
                  <td>{desig.designationName}</td>
                  <td>{desig.designationCode}</td>
                  <td>{desig.description}</td>
                  <td>{desig.isFullTimeAllowed ? "Yes" : "No"}</td>
                  <td>{desig.minFullTimeCtc ?? "-"}</td>
                  <td>{desig.maxFullTimeCtc ?? "-"}</td>
                  <td>{desig.minPartTimeCtc ?? "-"}</td>
                  <td>{desig.maxPartTimeCtc ?? "-"}</td>
                  <td>{desig.createdOn}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/admin/employees/${desig.id}`)}
                    >
                      Employees
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => onEdit(desig)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(desig.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DesignationDetails;