import axios from "axios";
import { useEffect, useState } from "react";
import { ToggleButton } from 'primereact/togglebutton';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

function CompanyDetails() {
    const [companies, setCompanies] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [msg, setMsg] = useState("");
    const [stateEnum, setStateEnum] = useState([]);
    const [cityEnum, setCityEnum] = useState([]);

    useEffect(() => {
        const getAllCompanies = async () => {
            try {
                let response = await axios.get(
                    "http://localhost:8080/api/company/getAll",
                    { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
                );
                setCompanies(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        
        getAllCompanies();
        
    }, []);

    // Fetch states
    useEffect(() => {
        const getStates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/company/getAllStates", {
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                setStateEnum(response.data);
            } catch (err) {
                setStateEnum([]);
            }
        };
        getStates();
    }, []);


    const getCities = async (stateValue) => {
        if (!stateValue) {
            setCityEnum([]);
            return;
        }
        try {
            const response = await axios.get(`http://localhost:8080/api/company/getAllCities?state=${stateValue}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            });
            setCityEnum(response.data);
        } catch (err) {
            setCityEnum([]);
        }
    };

    const handleEditClick = (company) => {
        setEditId(company.id);
        setEditData({
            name: company.name ?? "",
            pan: company.pan ?? "",
            tan: company.tan ?? "",
            email: company.email ?? "",
            website: company.website ?? "",
            address: company.address ?? "",
            state: company.state ?? "",
            city: company.city ?? "",
            pfCode: company.pfCode ?? "",
            esiCode: company.esiCode ?? "",
            ptCode: company.ptCode ?? "",
            isActive: company.isActive ?? false
        });
        setMsg("");
        if (company.state) getCities(company.state);
        else setCityEnum([]);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({
            ...prev,
            [name]: value ?? ""
        }));
    };

    const handleStateChange = (e) => {
        setEditData(prev => ({
            ...prev,
            state: e.target.value ?? "",
            city: ""
        }));
        getCities(e.target.value);
    };

    const handleEditSave = async () => {
        try {
            await axios.put(
                `http://localhost:8080/api/company/update/${editId}`,
                editData,
                { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
            );
            setMsg("Company details updated successfully!");
            setEditId(null);
            const getAllCompanies = async () => {
                try {
                    let response = await axios.get(
                        "http://localhost:8080/api/company/getAll",
                        { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
                    );
                    setCompanies(response.data);
                } catch (err) {
                    console.log(err);
                }
            };
            getAllCompanies();
        } catch (err) {
            setMsg("Error updating company details.");
        }
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditData({});
        setMsg("");
    };

    return (
        <main>
            <div className="container">
                <h2 style={{ color: "#fff", fontWeight: 700 }}>Company Details</h2>
                {msg && <div style={{ color: msg.includes("Error") ? "red" : "limegreen", marginBottom: 8 }}>{msg}</div>}
                {companies.length > 0 ? (
                    <div>
                        {companies.map((company, idx) => (
                            <div
                                className="location-card"
                                style={{
                                    background: "rgba(25, 27, 42, 0.5)",
                                    backdropFilter: "blur(8px)",
                                    borderRadius: "1.5em",
                                    margin: "1.5em auto",
                                    padding: "2em",
                                    maxWidth: 800,
                                    boxShadow: "0 2px 32px rgba(0,0,0,0.2)",
                                    color: "#fff"
                                }}
                                key={company.id}
                            >
                                <div className="card-body">
                                    {editId === company.id ? (
                                        <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>Name:</label>
                                                <input type="text" name="name" value={editData.name ?? ""} onChange={handleEditChange} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>PAN:</label>
                                                <input type="text" name="pan" value={editData.pan ?? ""} onChange={handleEditChange} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>TAN:</label>
                                                <input type="text" name="tan" value={editData.tan ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>Email:</label>
                                                <input type="email" name="email" value={editData.email ?? ""} onChange={handleEditChange} required style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>Website:</label>
                                                <input type="text" name="website" value={editData.website ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>Address:</label>
                                                <input type="text" name="address" value={editData.address ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>State:</label>
                                                <select
                                                    name="state"
                                                    value={editData.state ?? ""}
                                                    onChange={handleStateChange}
                                                    required
                                                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                                                >
                                                    <option value="">Select State</option>
                                                    {stateEnum.map(st => (
                                                        <option key={st} value={st}>{st}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>City:</label>
                                                <select
                                                    name="city"
                                                    value={editData.city ?? ""}
                                                    onChange={handleEditChange}
                                                    required
                                                    style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }}
                                                    disabled={!editData.state}
                                                >
                                                    <option value="">Select City</option>
                                                    {cityEnum.map(city => (
                                                        <option key={city} value={city}>{city}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>PF Code:</label>
                                                <input type="text" name="pfCode" value={editData.pfCode ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>ESI Code:</label>
                                                <input type="text" name="esiCode" value={editData.esiCode ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>PT Code:</label>
                                                <input type="text" name="ptCode" value={editData.ptCode ?? ""} onChange={handleEditChange} style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #333", background: "#181a29", color: "#fff" }} />
                                            </div>
                                            <div style={{ marginBottom: 10 }}>
                                                <label style={{ color: "#fff", fontWeight: 600, marginBottom: 4, display: "block" }}>Is Active:</label>
                                                <ToggleButton
                                                    checked={!!editData.isActive}
                                                    onChange={e => setEditData(prev => ({ ...prev, isActive: e.value }))}
                                                    className="w-8rem"
                                                    onLabel="Active"
                                                    offLabel="Inactive"
                                                    style={{ width: 110, background: editData.isActive ? "#5e63ff" : "#333", color: "#fff" }}
                                                />
                                            </div>
                                            <div style={{ textAlign: "center", margin: "1.5em 0" }}>
                                                <button type="submit" className="edit-btn" style={{ marginRight: 10 }}>Save</button>
                                                <button type="button" className="edit-btn" style={{ background: "#888" }} onClick={handleEditCancel}>Cancel</button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <h4 className="title" style={{ color: "#fff", fontWeight: 700, fontSize: "2.3em", textAlign: "left", letterSpacing: 1, marginBottom: "1.5em" }}>
                                                {company.name}
                                            </h4>
                                            <table
                                                className="table table-bordered table-hover"
                                                style={{
                                                    background: "transparent",
                                                    color: "#fff",
                                                    fontSize: "1.07rem",
                                                    borderRadius: "10px",
                                                    marginBottom: "0"
                                                }}
                                            >
                                                <tbody>
                                                    <tr><th style={{ color: "#6563FF", width: 180 }}>PAN</th><td>{company.pan}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>TAN</th><td>{company.tan}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>Email</th><td>{company.email}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>Website</th><td><a href={company.website} target="_blank" rel="noopener noreferrer" style={{ color: "#fff" }}>{company.website}</a></td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>Address</th><td>{company.address}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>State</th><td>{company.state}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>City</th><td>{company.city}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>PF Code</th><td>{company.pfCode}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>ESI Code</th><td>{company.esiCode}</td></tr>
                                                    <tr><th style={{ color: "#6563FF" }}>PT Code</th><td>{company.ptCode}</td></tr>
                                                    <tr>
                                                        <th style={{ color: "#6563FF" }}>Is Active</th>
                                                        <td>
                                                            <span style={{
                                                                display: "inline-block",
                                                                padding: "0.3em 1em",
                                                                borderRadius: "1em",
                                                                background: company.isActive ? "#5e63ff" : "#888",
                                                                color: "#fff",
                                                                fontWeight: 600
                                                            }}>
                                                                {company.isActive ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </>
                                    )}
                                </div>
                                {editId !== company.id && (
                                    <div className="card-btn-center" style={{ textAlign: "center", marginTop: "1.5em" }}>
                                        <button className="edit-btn" onClick={() => handleEditClick(company)}>Edit</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No company details found.</p>
                )}
            </div>
        </main>
    );
}

export default CompanyDetails;