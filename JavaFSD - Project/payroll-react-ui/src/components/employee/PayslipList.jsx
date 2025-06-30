import { useSelector } from "react-redux";
import { useState } from "react";
import { Paginator } from 'primereact/paginator';
import { useNavigate } from "react-router-dom";

function PayslipList() {
    const payslips = useSelector(state => state.payslips.payslips);
    const approvedPayslips = Array.isArray(payslips)
        ? payslips.filter(p => p.status === "APPROVED")
        : [];
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const navigate = useNavigate();

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const handleView = (payslip) => {
        // Example: Navigate to a payslip detail page (adjust path as needed)
        navigate(`/employee/payslips/${payslip.id}`);
    };

    return (
        <div className="container mt-4">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '1.5rem'
            }}>
                <h2 style={{ flex: 1, textAlign: 'center', margin: 0 }}>My Approved Payslips</h2>
            </div>
            {approvedPayslips.length === 0 ? (
                <p>No approved payslips found.</p>
            ) : (
                <>
                    <div style={{ width: "100%", overflowX: "auto" }}>
                        <table className="table table-bordered table-hover" style={{ minWidth: "2100px" }}>
                            <thead>
                                <tr>
                                    <th>EMP Code</th>
                                    <th>Name</th>
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
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedPayslips.slice(first, first + rows).map((p, idx) => (
                                    <tr key={p.id || idx}>
                                        <td>{p.employee.employeeCode}</td>
                                        <td>{p.employee.first_name}</td>
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
                                        <td>
                                            <button className="btn btn-primary btn-sm"
                                                onClick={() => handleView(p)}>
                                                View
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
                            totalRecords={approvedPayslips.length}
                            rowsPerPageOptions={[10, 20, 30]}
                            onPageChange={onPageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default PayslipList;