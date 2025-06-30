import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Paginator } from "primereact/paginator";

function ApprovePayslips() {
    const { departmentId, payrunId } = useParams();
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [checkedRows, setCheckedRows] = useState({});
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("");
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/payslips/payslips/${departmentId}/${payrunId}`,
                    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
                );
                setPayslips(response.data);
            } catch (err) {
                console.error(err);
                setPayslips([]);
            } finally {
                setLoading(false);
            }
        };
        fetchPayslips();
    }, [departmentId, payrunId]);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const paginatedPayslips = payslips.slice(first, first + rows);

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
                setMessage("Please select payslips and a status.");
                setLoadingUpdate(false);
                return;
            }
            await axios.put(
                `http://localhost:8080/api/payslips/status?status=${selectedStatus}`,
                checkedIds,
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
            setMessage("Status updated successfully!");
            // Optionally, you may want to refresh the payslip list here:
            const response = await axios.get(
                `http://localhost:8080/api/payslips/payslips/${departmentId}/${payrunId}`,
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
            setPayslips(response.data);
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
                <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>Approve Payslips</h2>
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
                        <option value="APPROVED">APPROVED</option>
                        <option value="REJECTED">REJECTED</option>
                        <option value="ON_HOLD">ON_HOLD</option>
                        <option value="REVISE">REVISE</option>
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
            ) : payslips.length === 0 ? (
                <p>No payslips found.</p>
            ) : (
                <>
                    <div style={{ width: "100%", overflowX: "auto" }}>
                        <table className="table table-bordered table-hover" style={{ minWidth: "2100px" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>EMP Code</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Month</th>
                                    <th>Year</th>
                                    <th>Basic Pay</th>
                                    <th>House Rent Allowance</th>
                                    <th>Dearness Allowance</th>
                                    <th>Special Allowance</th>
                                    <th>Medical Allowance</th>
                                    <th>Leave Travel Allowance</th>
                                    <th>Food Coupon</th>
                                    <th>Total Monthly Allowances</th>
                                    <th>Total Reimbursements</th>
                                    <th>Provident Fund</th>
                                    <th>Employee State Insurance</th>
                                    <th>Tax Deducted At Source</th>
                                    <th>Loss Of Pay Deduction</th>
                                    <th>Gross Salary</th>
                                    <th>Total Deductions</th>
                                    <th>Net Pay</th>
                                    <th>Total Working Days</th>
                                    <th>Total Payable Days</th>
                                    <th>Generated On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedPayslips.map((p, idx) => (
                                    <tr key={p.id || idx}>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={`flexCheck${p.id}`}
                                                    checked={!!checkedRows[p.id]}
                                                    onChange={() => handleCheckbox(p.id)}
                                                />
                                                <label className="form-check-label" htmlFor={`flexCheck${p.id}`}></label>
                                            </div>
                                        </td>
                                        <td>{p.employee.employeeCode}</td>
                                        <td>{p.employee.first_name}</td>
                                        <td>{p.status}</td>
                                        <td>{p.month}</td>
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
                                                : "-"}
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
                            totalRecords={payslips.length}
                            rowsPerPageOptions={[10, 20, 30]}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default ApprovePayslips;