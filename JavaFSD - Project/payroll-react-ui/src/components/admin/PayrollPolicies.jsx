import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PayrollPolicies() {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
     //const companyId = localStorage.getItem('companyId');

    useEffect(() => {
        const getPolicies = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/payroll-policy/getAll", {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                setPolicies(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        getPolicies();
    }, []);

    return (
        <main>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2>Payroll Policies</h2>
                    
                </div>
                {loading && <p>Loading...</p>}
                {!loading && policies.length === 0 && <p>No payroll policies found.</p>}
                {!loading && policies.length > 0 && (
                    policies.map((policy, idx) => (
                        <div key={idx} className="card mb-4" style={{ maxWidth: 600, margin: "0 auto" }}>
                            <div className="card-body">
                                <h4 className="card-title mb-3">Policy #{policy.id}</h4>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Pay Cycle:</strong></div>
                                    <div className="col-6">{policy.payCycleStartDay} - {policy.payCycleEndDay}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Employee PF Rate:</strong></div>
                                    <div className="col-6">{policy.employeePfRate}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Employer PF Rate:</strong></div>
                                    <div className="col-6">{policy.employerPfRate}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>EPS Rate:</strong></div>
                                    <div className="col-6">{policy.epsRate}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>PF Ceiling Required:</strong></div>
                                    <div className="col-6">{policy.pfCeilingRequired ? "Yes" : "No"}</div>
                                </div>
                                {policy.pfCeilingRequired && (
                                    <div className="row mb-2">
                                        <div className="col-6"><strong>PF Ceiling Amount:</strong></div>
                                        <div className="col-6">{policy.pfCeilingAmount}</div>
                                    </div>
                                )}
                                <div className="row mb-2">
                                    <div className="col-6"><strong>ESI Enabled:</strong></div>
                                    <div className="col-6">{policy.esiEnabled ? "Yes" : "No"}</div>
                                </div>
                                {policy.esiEnabled && (
                                    <>
                                        <div className="row mb-2">
                                            <div className="col-6"><strong>Employee ESI Rate:</strong></div>
                                            <div className="col-6">{policy.employeeEsiRate}%</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-6"><strong>Employer ESI Rate:</strong></div>
                                            <div className="col-6">{policy.employerEsiRate}%</div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-6"><strong>ESI Eligibility Ceiling:</strong></div>
                                            <div className="col-6">{policy.esiEligibilityCeiling}</div>
                                        </div>
                                    </>
                                )}
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Professional Tax Enabled:</strong></div>
                                    <div className="col-6">{policy.professionalTaxEnabled ? "Yes" : "No"}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Income Tax Enabled:</strong></div>
                                    <div className="col-6">{policy.incomeTaxEnabled ? "Yes" : "No"}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Basic %:</strong></div>
                                    <div className="col-6">{policy.basicPercent}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>HRA Metro %:</strong></div>
                                    <div className="col-6">{policy.hraMetroPercent}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>HRA Non-Metro %:</strong></div>
                                    <div className="col-6">{policy.hraNonMetroPercent}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>DA %:</strong></div>
                                    <div className="col-6">{policy.daPercent}%</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Medical Allowance:</strong></div>
                                    <div className="col-6">{policy.medicalAllowance}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>LTA Allowance:</strong></div>
                                    <div className="col-6">{policy.ltaAllowance}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Special Allowance:</strong></div>
                                    <div className="col-6">{policy.specialAllowance}</div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-6"><strong>Food Coupon Amount:</strong></div>
                                    <div className="col-6">{policy.foodCouponAmount}</div>
                                </div>
                                <div style={{ textAlign: "center", marginTop: "1.5em" }}>
                                    <Link to={`/admin/payroll-policies/edit/${policy.id}`}>
  <button className="btn btn-primary btn-sm">Edit</button>
</Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}

export default PayrollPolicies;