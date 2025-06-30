import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddDepartment() {
    const params = useParams();
    const navigate = useNavigate();
    const [departmentName, setDepartmentName] = useState("");
    const [departmentCode, setDepartmentCode] = useState("");
    const [description, setDescription] = useState("");
    const [msg, setMsg] = useState("");

    const handleAddDepartment = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/department/add/" + params.companyId,
                {
                    departmentName,
                    departmentCode,
                    description
                },
                {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                }
            );
            setMsg("Department added successfully!");
            setDepartmentName("");
            setDepartmentCode("");
            setDescription("");
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
                maxWidth: 600,
                boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
                color: "#fff"
            }}>
            <h3 style={{
                color: "#6563FF",
                fontWeight: 600,
                marginBottom: "1.5em",
                textAlign: "center"
            }}>
                Add New Department
            </h3>
            {msg && (
                <div style={{
                    color: msg.includes("Fail") ? "red" : "limegreen",
                    textAlign: "center",
                    marginBottom: "1em"
                }}>{msg}</div>
            )}
            <form onSubmit={e => { e.preventDefault(); handleAddDepartment(); }}>
                <table className="table table-bordered" style={{ background: "transparent", color: "#fff" }}>
                    <tbody>
                        <tr>
                            <th style={{ color: "#6563FF" }}>Department Name</th>
                            <td>
                                <input
                                    type="text"
                                    name="departmentName"
                                    value={departmentName}
                                    onChange={e => setDepartmentName(e.target.value)}
                                    required
                                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ color: "#6563FF" }}>Department Code</th>
                            <td>
                                <input
                                    type="text"
                                    name="departmentCode"
                                    value={departmentCode}
                                    onChange={e => setDepartmentCode(e.target.value)}
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
                                    rows={3}
                                    required
                                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                                ></textarea>
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

export default AddDepartment;