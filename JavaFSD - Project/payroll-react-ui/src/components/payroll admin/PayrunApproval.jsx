import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PayrunApproval() {
    const [payruns, setPayruns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState({});

    useEffect(() => {
        const fetchPayruns = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/payroll/getAllPayruns",
                    { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
                );
                setPayruns(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPayruns();
    }, []);

    const grouped = payruns.reduce((acc, p) => {
        const key = `${p.month}-${p.year}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(p);
        return acc;
    }, {});

    const getMonthName = (m) =>
        new Date(2000, m - 1).toLocaleString('default', { month: 'long' });

    const handleToggleStatus = async (payrun) => {
        if (payrun.status !== "PENDING") return;
        setUpdating(prev => ({ ...prev, [payrun.id]: true }));
        try {
            await axios.put(
                `http://localhost:8080/api/payroll/${payrun.id}/status?status=APPROVED`,
                {},
                { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } }
            );
            setPayruns(prev =>
                prev.map(p =>
                    p.id === payrun.id ? { ...p, status: "APPROVED" } : p
                )
            );
        } catch (err) {
            alert("Failed to update status!");
            console.error(err);
        } finally {
            setUpdating(prev => ({ ...prev, [payrun.id]: false }));
        }
    };

    return (
        <div className="container mt-4">
            <h2 style={{ textAlign: 'center', marginBottom: "2rem" }}>Payrun Approval</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                Object.keys(grouped).length === 0 ? (
                    <p>No payruns found.</p>
                ) : (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                        {Object.entries(grouped).map(([key, monthPayruns]) => {
                            const [month, year] = key.split('-');
                            return (
                                <div key={key} style={{
                                    flex: '1 1 400px',
                                    background: "linear-gradient(135deg, #dbeafe 0%, #f0fdfa 100%)",
                                    borderRadius: 16,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                    padding: 28,
                                    minWidth: 370,
                                    marginBottom: 12,
                                    border: "1.5px solid rgb(41, 54, 63)"
                                }}>
                                    <h4 style={{ textAlign: "center", color: "#195b8a", letterSpacing: 2, fontWeight: 700 }}>
                                        {getMonthName(Number(month)).toUpperCase()} - {year}
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 20 }}>
                                        {monthPayruns.map(pr => (
                                            <div key={pr.id} style={{
                                                background: 'linear-gradient(90deg, #bae6fd 0%,rgb(33, 31, 134) 100%)',
                                                borderRadius: 10,
                                                boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                                                padding: 18,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: "space-between",
                                                border: "1px solid #7dd3fc"
                                            }}>
                                                <div style={{ color: "#195b8a", fontWeight: 500 }}>
                                                    <span style={{ fontWeight: 700 }}>Dept:</span> {pr.department.departmentName}
                                                    <br />
                                                    <span style={{ fontWeight: 700 }}>Status:</span> {pr.status}
                                                    <br />
                                                    <span style={{ fontWeight: 700 }}>Execution Date:</span> {pr.executionDate}
                                                </div>
                                                <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "end" }}>
                                                    <div className="form-check form-switch" style={{ minWidth: 120 }}>
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`payrun-toggle-${pr.id}`}
                                                            checked={pr.status === "APPROVED"}
                                                            disabled={pr.status === "APPROVED" || updating[pr.id]}
                                                            onChange={() => handleToggleStatus(pr)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`payrun-toggle-${pr.id}`}>
                                                            {pr.status === "APPROVED" ? "Approved" : "Pending"}
                                                        </label>
                                                    </div>
                                                    <Link to={`/payroll-admin/payslip-details/${pr.department.id}/${pr.id}`}>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            style={{ fontWeight: 600, borderRadius: 8, minWidth: 110 }}
                                                        >
                                                            View Payslips
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
        </div>
    );
}

export default PayrunApproval;