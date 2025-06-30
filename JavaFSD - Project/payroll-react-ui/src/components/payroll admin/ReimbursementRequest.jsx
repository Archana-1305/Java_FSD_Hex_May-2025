import { useEffect, useState } from "react";
import axios from "axios";
import { Paginator } from "primereact/paginator";

function ReimbursementRequest() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [checkedRows, setCheckedRows] = useState({});
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/reimbursements/by-status?status=PENDING`,
                    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
                );
                setRequests(response.data);
            } catch (err) {
                console.error(err);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };
        fetchRequests();
    }, []);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const paginatedRequests = requests.slice(first, first + rows);

    const handleCheckbox = (id) => {
        setCheckedRows(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleUpdateStatus = async () => {
        setLoadingUpdate(true);
        setMessage("");
        try {
            const checkedIds = Object.entries(checkedRows)
                .filter(([id, checked]) => checked)
                .map(([id]) => id);
            if (checkedIds.length === 0 || !selectedStatus) {
                setMessage("Please select reimbursement requests and a status.");
                setLoadingUpdate(false);
                return;
            }
            // For each selected reimbursement request, update status
            await Promise.all(checkedIds.map(async (requestId) => {
            await axios.put(
                `http://localhost:8080/api/reimbursements/${requestId}?status=${selectedStatus}`,
                {},
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
        }));
            setMessage("Status updated successfully!");
            // Refresh the list
            const response = await axios.get(
                `http://localhost:8080/api/reimbursements/by-status?status=PENDING`,
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
            setRequests(response.data);
            setCheckedRows({});
            setShowStatusModal(false);
            setSelectedStatus("");
        } catch (err) {
            setMessage("Failed to update status!");
            console.error(err);
        }
        setLoadingUpdate(false);
    };

    return (
        <div className="container mt-4">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Pending Reimbursement Requests</h2>
            </div>
            {message && (
                <div style={{ marginBottom: 10, color: message.includes("success") ? "green" : "red", textAlign: "center" }}>
                    {message}
                </div>
            )}
            <div style={{ marginBottom: 16 }}>
                <button
                    className="btn btn-warning"
                    disabled={Object.values(checkedRows).filter(Boolean).length === 0}
                    onClick={() => setShowStatusModal(true)}
                >
                    Update Status
                </button>
            </div>
            {showStatusModal && (
                <div style={{ marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' }}>
                    <select
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                        className="form-select"
                        style={{ width: 180 }}
                    >
                        <option value="">Select Status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                    </select>
                    <button
                        className="btn btn-success"
                        disabled={!selectedStatus || loadingUpdate}
                        onClick={handleUpdateStatus}
                    >
                        {loadingUpdate ? "Updating..." : "Confirm"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => setShowStatusModal(false)}>
                        Cancel
                    </button>
                </div>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : requests.length === 0 ? (
                <p>No reimbursement requests found.</p>
            ) : (
                <>
                    <div style={{ width: "100%", overflowX: "auto" }}>
                        <table className="table table-bordered table-hover" style={{ minWidth: "1200px" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Request ID</th>
                                    <th>Employee Code</th>
                                    <th>Employee Name</th>
                                    <th>Amount</th>
                                    <th>Reason</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRequests.map((req, idx) => (
                                    <tr key={req.id || idx}>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`flexCheck${req.id}`}
                                                    checked={!!checkedRows[req.id]}
                                                    onChange={() => handleCheckbox(req.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`flexCheck${req.id}`}></label>
                                            </div>
                                        </td>
                                        <td>{req.id}</td>
                                        <td>{req.employee?.employeeCode}</td>
                                        <td>{req.employee?.first_name} {req.employee?.last_name}</td>
                                        <td>{req.amount}</td>
                                        <td>{req.reason}</td>
                                        <td>{req.requestDate ? new Date(req.requestDate).toLocaleDateString() : "-"}</td>
                                        <td>{req.status}</td>
                                        <td>{req.remarks || "-"}</td>
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
                            totalRecords={requests.length}
                            rowsPerPageOptions={[10, 20, 30]}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default ReimbursementRequest;