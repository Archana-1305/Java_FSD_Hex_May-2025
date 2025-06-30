import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddEmployee() {
  const params = useParams();
  const navigate = useNavigate();

  // Employee fields
  const [employeeCode, setEmployeeCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [empType, setEmpType] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const [dateOfLeaving, setDateOfLeaving] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [ctcAmount, setCtcAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  // User fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const [msg, setMsg] = useState("");

  const postEmployee = async () => {
    try {
      await axios.post(
        `http://localhost:8080/api/employee/add/${params.designationId}`,
        {
          employeeCode,
          first_name: firstName,
          last_name: lastName,
          gender,
          email,
          contact,
          address,
          dob,
          emp_type: empType,
          date_of_joining: dateOfJoining,
          date_of_leaving: dateOfLeaving ? dateOfLeaving : null,
          status,
          ctcAmount,
          bankName,
          accountNumber,
          ifscCode,
          user: {
            username,
            password,
            role
          }
        },
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
      );
      setMsg("Employee added successfully!");
      setTimeout(() => navigate(-1), 1200);
    } catch (err) {
      setMsg("Operation Failed, Try again");
    }
  };

  return (
    <div className="location-card"
      style={{
        background: "rgba(25, 27, 42, 0.5)",
        backdropFilter: "blur(8px)",
        borderRadius: "1.5em",
        margin: "1.5em auto",
        padding: "2em",
        maxWidth: 900,
        boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
        color: "#fff"
      }}>
      <h3 style={{
        color: "#6563FF",
        fontWeight: 600,
        marginBottom: "1.5em",
        textAlign: "center"
      }}>
        Add New Employee
      </h3>
      {msg && (
        <div style={{
          color: msg.includes("Fail") ? "red" : "limegreen",
          textAlign: "center",
          marginBottom: "1em"
        }}>{msg}</div>
      )}
      <form onSubmit={e => { e.preventDefault(); postEmployee(); }}>
        <table className="table table-bordered" style={{ background: "transparent", color: "#fff" }}>
          <tbody>
            <tr>
              <th style={{ color: "#6563FF" }}>Employee Code</th>
              <td>
                <input type="text" value={employeeCode} onChange={e => setEmployeeCode(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>First Name</th>
              <td>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Last Name</th>
              <td>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Gender</th>
              <td>
                <select value={gender} onChange={e => setGender(e.target.value)} required style={inputStyle}>
                  <option value="">Select</option>
                  <option value="FEMALE">Female</option>
                  <option value="MALE">Male</option>
                  <option value="OTHER">Other</option>
                </select>
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Email</th>
              <td>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Contact</th>
              <td>
                <input type="text" value={contact} onChange={e => setContact(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Address</th>
              <td>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Date of Birth</th>
              <td>
                <input type="date" value={dob} onChange={e => setDob(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Employee Type</th>
              <td>
                <select value={empType} onChange={e => setEmpType(e.target.value)} required style={inputStyle}>
                  <option value="">Select</option>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </td>
              <th style={{ color: "#6563FF" }}>Date of Joining</th>
              <td>
                <input type="date" value={dateOfJoining} onChange={e => setDateOfJoining(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Date of Leaving</th>
              <td>
                <input type="date" value={dateOfLeaving} onChange={e => setDateOfLeaving(e.target.value)} style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Status</th>
              <td>
                <select value={status} onChange={e => setStatus(e.target.value)} required style={inputStyle}>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>CTC Amount</th>
              <td>
                <input type="number" value={ctcAmount} onChange={e => setCtcAmount(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Bank Name</th>
              <td>
                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Account Number</th>
              <td>
                <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>IFSC Code</th>
              <td>
                <input type="text" value={ifscCode} onChange={e => setIfscCode(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Username</th>
              <td>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required style={inputStyle} />
              </td>
              <th style={{ color: "#6563FF" }}>Password</th>
              <td>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={inputStyle} />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Role</th>
              <td>
                <select value={role} onChange={e => setRole(e.target.value)} required style={inputStyle}>
                  <option value="EMPLOYEE">Employee</option>
                  <option value="HR_MANAGER">HR Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ textAlign: "center", margin: "1.5em 0" }}>
          <button type="submit" className="edit-btn" style={{ marginRight: 10 }}>Add</button>
          <button type="button" className="edit-btn" style={{ background: "#888" }} onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = { width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" };

export default AddEmployee;