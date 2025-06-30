import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AddDesignation() {
  let params = useParams();
  let navigate = useNavigate();
  let [designationName, setDesignationName] = useState("");
  let [designationCode, setDesignationCode] = useState("");
  let [description, setDescription] = useState("");
  let [isFullTimeAllowed, setIsFullTimeAllowed] = useState("false");
  let [isPartTimeAllowed, setIsPartTimeAllowed] = useState("false");
  let [minFullTimeCtc, setMinFullTimeCtc] = useState("");
  let [maxFullTimeCtc, setMaxFullTimeCtc] = useState("");
  let [minPartTimeCtc, setMinPartTimeCtc] = useState("");
  let [maxPartTimeCtc, setMaxPartTimeCtc] = useState("");
  let [msg, setMsg] = useState("");

  let postDesignation = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/designation/add/" + params.departmentId,
        {
          designationName: designationName,
          designationCode: designationCode,
          description: description,
          isFullTimeAllowed: isFullTimeAllowed === "false",
          isPartTimeAllowed:isPartTimeAllowed === "false",
          minFullTimeCtc: minFullTimeCtc,
          maxFullTimeCtc: maxFullTimeCtc,
          minPartTimeCtc: minPartTimeCtc,
          maxPartTimeCtc: maxPartTimeCtc,
        },
        {
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
      );
      setMsg("Designation added successfully!");
      setDesignationName("");
      setDesignationCode("");
      setDescription("");
      setIsFullTimeAllowed("true");
      setIsPartTimeAllowed("true")
      setMinFullTimeCtc("");
      setMaxFullTimeCtc("");
      setMinPartTimeCtc("");
      setMaxPartTimeCtc("");
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
        maxWidth: 800,
        boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
        color: "#fff"
      }}>
      <h3 style={{
        color: "#6563FF",
        fontWeight: 600,
        marginBottom: "1.5em",
        textAlign: "center"
      }}>
        Add New Designation
      </h3>
      {msg && (
        <div style={{
          color: msg.includes("Fail") ? "red" : "limegreen",
          textAlign: "center",
          marginBottom: "1em"
        }}>{msg}</div>
      )}
      <form onSubmit={e => { e.preventDefault(); postDesignation(); }}>
        <table className="table table-bordered" style={{ background: "transparent", color: "#fff" }}>
          <tbody>
            <tr>
              <th style={{ color: "#6563FF" }}>Designation Name</th>
              <td>
                <input
                  type="text"
                  name="designationName"
                  value={designationName}
                  onChange={e => setDesignationName(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Designation Code</th>
              <td>
                <input
                  type="text"
                  name="designationCode"
                  value={designationCode}
                  onChange={e => setDesignationCode(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Description</th>
              <td>
                <textarea
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                  required
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                ></textarea>
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Full-Time Allowed</th>
              <td>
                <select
                  value={isFullTimeAllowed}
                  onChange={e => setIsFullTimeAllowed(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Min Full-Time CTC</th>
              <td>
                <input
                  type="number"
                  name="minFullTimeCtc"
                  value={minFullTimeCtc}
                  onChange={e => setMinFullTimeCtc(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Max Full-Time CTC</th>
              <td>
                <input
                  type="number"
                  name="maxFullTimeCtc"
                  value={maxFullTimeCtc}
                  onChange={e => setMaxFullTimeCtc(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Part-Time Allowed</th>
              <td>
                <select
                  value={isFullTimeAllowed}
                  onChange={e => setIsPartTimeAllowed(e.target.value)}
                  required
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Min Part-Time CTC</th>
              <td>
                <input
                  type="number"
                  name="minPartTimeCtc"
                  value={minPartTimeCtc}
                  onChange={e => setMinPartTimeCtc(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
              </td>
            </tr>
            <tr>
              <th style={{ color: "#6563FF" }}>Max Part-Time CTC</th>
              <td>
                <input
                  type="number"
                  name="maxPartTimeCtc"
                  value={maxPartTimeCtc}
                  onChange={e => setMaxPartTimeCtc(e.target.value)}
                  style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                />
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

export default AddDesignation;