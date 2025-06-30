import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPayslips = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8080/api/payslips/getAllPayslips?status=REVISE",
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
    }, []);

    return (
        <div className="container mt-4">
            <h2 style={{ textAlign: 'center', marginBottom: "2rem" }}>Notifications</h2>
            {loading ? (
                <p>Loading...</p>
            ) : payslips.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888' }}>No payslips marked as revise.</div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
                    {payslips.map((payslip, idx) => (
                        <div key={payslip.id || idx}
                            style={{
                                background: 'linear-gradient(90deg, #fef9c3 0%, #fecaca 100%)',
                                border: '1.5px solid #fbbf24',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                                padding: 24,
                                minWidth: 350,
                                maxWidth: 500,
                                width: "100%",
                                display: 'flex',
                                alignItems: 'center',
                                gap: 16
                            }}
                        >
                            <div style={{ fontSize: 36, color: "#b91c1c", marginRight: 16 }}>⚠️</div>
                            <div>
                                <div style={{ fontWeight: 600, color: "#b91c1c", marginBottom: 4 }}>
                                    Revise Required!
                                </div>
                                <div style={{ color: "#444", fontSize: 15 }}>
                                    Revise the payslip for <b>{payslip.employee?.first_name} ({payslip.employee?.employeeCode})</b>
                                    {" "}of <b>{payslip.payrollRun.department.departmentName}</b> for <b>{payslip.month}/{payslip.year}</b>.
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Notifications;