import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AllowanceDetails() {
    const { companyId } = useParams(); // get from URL params
    const [allowances, setAllowances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState("add"); // "add" or "edit"
    const [msg, setMsg] = useState("");
    const [editAllowance, setEditAllowance] = useState(null);

    // Form values
    const [name, setName] = useState("");
    const [assignToAll, setAssignToAll] = useState(false);
    const [description, setDescription] = useState("");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const getAllowances = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/allowance/getAll", {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                setAllowances(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getAllowances();
    }, []);

    const openAddModal = () => {
        setModalType("add");
        setName("");
        setAssignToAll(false);
        setDescription("");
        setIsActive(true);
        setShowModal(true);
        setEditAllowance(null);
        setMsg("");
    };

    const openEditModal = (allowance) => {
        setModalType("edit");
        setEditAllowance(allowance);
        setName(allowance.name || "");
        setAssignToAll(!!allowance.assignToAll);
        setDescription(allowance.description || "");
        setIsActive(!!allowance.isActive);
        setShowModal(true);
        setMsg("");
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!name) {
            setMsg("Name is required");
            return;
        }
        try {
            if (modalType === "add") {
                if (!companyId) {
                    setMsg("Company ID missing in URL.");
                    return;
                }
                await axios.post(
                    `http://localhost:8080/api/allowance/add/${companyId}`,
                    { name, assignToAll, description, isActive },
                    { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
                );
                setMsg("Allowance added successfully!");
            } else if (modalType === "edit" && editAllowance) {
                await axios.put(
                    `http://localhost:8080/api/allowance/update/${editAllowance.id}`,
                    { name, assignToAll, description, isActive },
                    { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
                );
                setMsg("Allowance updated successfully!");
            }
            // Reload allowances
            const response = await axios.get("http://localhost:8080/api/allowance/getAll", {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            setAllowances(response.data);
            setShowModal(false);
        } catch (err) {
            setMsg("Operation failed. Try again.");
        }
    };

    return (
        <main>
            <style>{`
                .allowance-modal-label {
                  color: #232323 !important;
                  font-weight: 700;
                  font-size: 1.05rem;
                  opacity: 1 !important;
                  margin-bottom: 0.35rem;
                  letter-spacing: 0.01em;
                }
            `}</style>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>Allowances & Incentives</h2>
                    <button className="btn btn-primary btn-sm" onClick={openAddModal}>
                        Add Allowance/Incentives +
                    </button>
                </div>
                {msg && (
                    <div style={{ color: msg.includes("fail") ? "red" : "green", marginBottom: "1em" }}>
                        {msg}
                    </div>
                )}
                {loading && <p>Loading...</p>}
                {!loading && allowances.length === 0 && <p>No allowances found.</p>}
                {!loading && allowances.length > 0 && (
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Assign to All</th>
                                <th>Description</th>
                                <th>Active Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allowances.map((allowance, idx) => (
                                <tr key={idx}>
                                    <td>{allowance.name}</td>
                                    <td>{allowance.assignToAll ? "Yes" : "No"}</td>
                                    <td>{allowance.description}</td>
                                    <td>{allowance.isActive ? "Yes" : "No"}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={() => openEditModal(allowance)}>
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Modal for Add/Edit */}
            {showModal && (
                <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.3)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleSave}>
                                <div className="modal-header">
                                    <h5 className="modal-title" style={{ color: "#222", fontWeight: 700 }}>
                                        {modalType === "add" ? "Add Allowance/Incentive" : "Edit Allowance/Incentive"}
                                    </h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <label className="allowance-modal-label">Name</label>
                                    <input className="form-control mb-2" value={name || ""} onChange={e => setName(e.target.value)} required />

                                    <label className="allowance-modal-label">Assign to All</label>
                                    <select className="form-control mb-2" value={assignToAll ? "yes" : "no"} onChange={e => setAssignToAll(e.target.value === "yes")}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>

                                    <label className="allowance-modal-label">Description</label>
                                    <input className="form-control mb-2" value={description || ""} onChange={e => setDescription(e.target.value)} />

                                    <label className="allowance-modal-label">Active Status</label>
                                    <select className="form-control mb-2" value={isActive ? "yes" : "no"} onChange={e => setIsActive(e.target.value === "yes")}>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-success">{modalType === "add" ? "Add" : "Save"}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default AllowanceDetails;