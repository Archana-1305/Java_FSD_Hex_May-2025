import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPayrollPolicy() {
  let params = useParams();
  let navigate = useNavigate();

  // State for each field (add or remove fields as needed)
  let [payCycleStartDay, setPayCycleStartDay] = useState("");
  let [payCycleEndDay, setPayCycleEndDay] = useState("");
  let [employeePfRate, setEmployeePfRate] = useState("");
  let [employerPfRate, setEmployerPfRate] = useState("");
  let [epsRate, setEpsRate] = useState("");
  let [pfCeilingRequired, setPfCeilingRequired] = useState(false);
  let [pfCeilingAmount, setPfCeilingAmount] = useState("");
  let [esiEnabled, setEsiEnabled] = useState(false);
  let [employeeEsiRate, setEmployeeEsiRate] = useState("");
  let [employerEsiRate, setEmployerEsiRate] = useState("");
  let [esiEligibilityCeiling, setEsiEligibilityCeiling] = useState("");
  let [professionalTaxEnabled, setProfessionalTaxEnabled] = useState(false);
  let [incomeTaxEnabled, setIncomeTaxEnabled] = useState(false);
  let [basicPercent, setBasicPercent] = useState("");
  let [hraMetroPercent, setHraMetroPercent] = useState("");
  let [hraNonMetroPercent, setHraNonMetroPercent] = useState("");
  let [daPercent, setDaPercent] = useState("");
  let [medicalAllowance, setMedicalAllowance] = useState("");
  let [ltaAllowance, setLtaAllowance] = useState("");
  let [specialAllowance, setSpecialAllowance] = useState("");
  let [foodCouponAmount, setFoodCouponAmount] = useState("");
  let [msg, setMsg] = useState("");

  // Fetch current policy details
  useEffect(() => {
    let fetchPolicy = async () => {
      try {
        let res = await axios.get(
          `http://localhost:8080/api/payroll-policy/getById/${params.id}`,
          { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
        );
        let policy = res.data;
        setPayCycleStartDay(policy.payCycleStartDay || "");
        setPayCycleEndDay(policy.payCycleEndDay || "");
        setEmployeePfRate(policy.employeePfRate || "");
        setEmployerPfRate(policy.employerPfRate || "");
        setEpsRate(policy.epsRate || "");
        setPfCeilingRequired(policy.pfCeilingRequired || false);
        setPfCeilingAmount(policy.pfCeilingAmount || "");
        setEsiEnabled(policy.esiEnabled || false);
        setEmployeeEsiRate(policy.employeeEsiRate || "");
        setEmployerEsiRate(policy.employerEsiRate || "");
        setEsiEligibilityCeiling(policy.esiEligibilityCeiling || "");
        setProfessionalTaxEnabled(policy.professionalTaxEnabled || false);
        setIncomeTaxEnabled(policy.incomeTaxEnabled || false);
        setBasicPercent(policy.basicPercent || "");
        setHraMetroPercent(policy.hraMetroPercent || "");
        setHraNonMetroPercent(policy.hraNonMetroPercent || "");
        setDaPercent(policy.daPercent || "");
        setMedicalAllowance(policy.medicalAllowance || "");
        setLtaAllowance(policy.ltaAllowance || "");
        setSpecialAllowance(policy.specialAllowance || "");
        setFoodCouponAmount(policy.foodCouponAmount || "");
      } catch {
        setMsg("Failed to load policy.");
      }
    };
    fetchPolicy();
    // eslint-disable-next-line
  }, [params.id]);

  let updatePolicy = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/payroll-policy/update/${params.id}`,
        {
          payCycleStartDay,
          payCycleEndDay,
          employeePfRate,
          employerPfRate,
          epsRate,
          pfCeilingRequired,
          pfCeilingAmount: pfCeilingRequired ? pfCeilingAmount : "",
          esiEnabled,
          employeeEsiRate: esiEnabled ? employeeEsiRate : "",
          employerEsiRate: esiEnabled ? employerEsiRate : "",
          esiEligibilityCeiling: esiEnabled ? esiEligibilityCeiling : "",
          professionalTaxEnabled,
          incomeTaxEnabled,
          basicPercent,
          hraMetroPercent,
          hraNonMetroPercent,
          daPercent,
          medicalAllowance,
          ltaAllowance,
          specialAllowance,
          foodCouponAmount
        },
        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
      );
      setMsg("Policy updated successfully!");
      setTimeout(() => navigate(-1), 1200);
    } catch {
      setMsg("Failed to update policy.");
    }
  };

  return (
    <div className="container" style={{ maxWidth: 700, marginTop: 30 }}>
      <h2>Edit Payroll Policy</h2>
      {msg && <div style={{ color: msg.includes("success") ? "green" : "red", margin: 10 }}>{msg}</div>}
      <form onSubmit={updatePolicy}>
        <div className="row">
          <div className="col-6">
            <label>Pay Cycle Start Day</label>
            <input type="number" className="form-control" value={payCycleStartDay} onChange={e => setPayCycleStartDay(e.target.value)} required />
          </div>
          <div className="col-6">
            <label>Pay Cycle End Day</label>
            <input type="number" className="form-control" value={payCycleEndDay} onChange={e => setPayCycleEndDay(e.target.value)} required />
          </div>
        </div>
        {/* ...repeat for all other fields in similar blocks... */}
        <div className="row">
          <div className="col-6">
            <label>Employee PF Rate (%)</label>
            <input type="number" className="form-control" value={employeePfRate} onChange={e => setEmployeePfRate(e.target.value)} required />
          </div>
          <div className="col-6">
            <label>Employer PF Rate (%)</label>
            <input type="number" className="form-control" value={employerPfRate} onChange={e => setEmployerPfRate(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <label>EPS Rate (%)</label>
            <input type="number" className="form-control" value={epsRate} onChange={e => setEpsRate(e.target.value)} required />
          </div>
          <div className="col-6" style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
            <input type="checkbox" checked={pfCeilingRequired} onChange={e => setPfCeilingRequired(e.target.checked)} />
            <label style={{ marginLeft: 8 }}>PF Ceiling Required?</label>
          </div>
        </div>
        {pfCeilingRequired && (
          <div className="row">
            <div className="col-6">
              <label>PF Ceiling Amount</label>
              <input type="number" className="form-control" value={pfCeilingAmount} onChange={e => setPfCeilingAmount(e.target.value)} required />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-6" style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
            <input type="checkbox" checked={esiEnabled} onChange={e => setEsiEnabled(e.target.checked)} />
            <label style={{ marginLeft: 8 }}>ESI Enabled?</label>
          </div>
        </div>
        {esiEnabled && (
          <div className="row">
            <div className="col-4">
              <label>Employee ESI Rate (%)</label>
              <input type="number" className="form-control" value={employeeEsiRate} onChange={e => setEmployeeEsiRate(e.target.value)} />
            </div>
            <div className="col-4">
              <label>Employer ESI Rate (%)</label>
              <input type="number" className="form-control" value={employerEsiRate} onChange={e => setEmployerEsiRate(e.target.value)} />
            </div>
            <div className="col-4">
              <label>ESI Eligibility Ceiling</label>
              <input type="number" className="form-control" value={esiEligibilityCeiling} onChange={e => setEsiEligibilityCeiling(e.target.value)} />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-6" style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
            <input type="checkbox" checked={professionalTaxEnabled} onChange={e => setProfessionalTaxEnabled(e.target.checked)} />
            <label style={{ marginLeft: 8 }}>Professional Tax Enabled?</label>
          </div>
          <div className="col-6" style={{ display: "flex", alignItems: "center", marginTop: 25 }}>
            <input type="checkbox" checked={incomeTaxEnabled} onChange={e => setIncomeTaxEnabled(e.target.checked)} />
            <label style={{ marginLeft: 8 }}>Income Tax Enabled?</label>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>Basic %</label>
            <input type="number" className="form-control" value={basicPercent} onChange={e => setBasicPercent(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>HRA Metro %</label>
            <input type="number" className="form-control" value={hraMetroPercent} onChange={e => setHraMetroPercent(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>HRA Non-Metro %</label>
            <input type="number" className="form-control" value={hraNonMetroPercent} onChange={e => setHraNonMetroPercent(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>DA %</label>
            <input type="number" className="form-control" value={daPercent} onChange={e => setDaPercent(e.target.value)} required />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <label>Medical Allowance</label>
            <input type="number" className="form-control" value={medicalAllowance} onChange={e => setMedicalAllowance(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>LTA Allowance</label>
            <input type="number" className="form-control" value={ltaAllowance} onChange={e => setLtaAllowance(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>Special Allowance</label>
            <input type="number" className="form-control" value={specialAllowance} onChange={e => setSpecialAllowance(e.target.value)} required />
          </div>
          <div className="col-3">
            <label>Food Coupon Amount</label>
            <input type="number" className="form-control" value={foodCouponAmount} onChange={e => setFoodCouponAmount(e.target.value)} required />
          </div>
        </div>
        <div style={{ textAlign: "center", margin: 18 }}>
          <button type="submit" className="btn btn-primary">Update Policy</button>
          <button type="button" className="btn btn-secondary" style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPayrollPolicy;