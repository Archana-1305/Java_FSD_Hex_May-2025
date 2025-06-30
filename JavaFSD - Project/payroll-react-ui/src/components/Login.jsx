import axios from "axios";
import { useState } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/actions/UserAction";
import { useDispatch } from "react-redux";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const processLogin = async () => {
        let encodedString = window.btoa(username + ':' + password);

        try {
            // Step 1: Get Token
            const response = await axios.get('http://localhost:8080/api/user/token', {
                headers: { "Authorization": "Basic " + encodedString }
            });
            let token = response.data.token;
            localStorage.setItem('token', token);

            // Step 2: Get User Details
            let details = await axios.get('http://localhost:8080/api/user/details', {
                headers: { "Authorization": "Bearer " + token }
            });

            // Decide correct user/role values for Redux
            let role, name;
            if (details.data.user) {
                // Employee
                role = details.data.user.role;
                name = details.data.first_name || details.data.user.username;
            } else {
                // Super admin
                role = details.data.role;
                name = details.data.username;
            }
            localStorage.setItem('name', name);

            dispatch(setUserDetails({ username: name, role }));

            switch (role) {
                case "SYSTEM_ADMIN":
                    navigate("/admin");
                    break;
                case "HR":
                    // navigate("/hr-manager-dashboard");
                    setMsg("Go to HR Manager Dashboard");
                    break;
                case "DEPARTMENT_HR":
                    // navigate("/department-hr-dashboard");
                    setMsg("Go to Department HR Dashboard");
                    break;
                case "PAYROLL_ADMIN":
                    navigate("/payroll-admin")
                    break;
                case "FINANCE_MANAGER":
                    // navigate("/finance-manager-dashboard");
                    setMsg("Go to Finance Manager Dashboard");
                    break;
                case "EMPLOYEE":
                    // navigate("/employee-dashboard");
                    navigate("/employee");
                    break;
                default:
                    setMsg("Login Disabled, Contact Admin at admin@example.com");
                    return;
            }
            setMsg("Logged in Successfully!!!");
        } catch (err) {
            setMsg('Invalid Credentials');
        }
    };

    return (
        <div className="login-container">
            <div className="left-panel">
                <h2>EASY PAY</h2>
                <p>Payroll Management System</p>
                <ul>
                    <li>Automate Payroll Calculations</li>
                    <li>Streamline Data Entry</li>
                    <li>Integrated Compliance</li>
                </ul>
            </div>
            <div className="right-panel">
                <div className="login-card">
                    <h1 className="brand">EMPRA</h1>
                    <h3>Login</h3>
                    {msg && <div className="alert">{msg}</div>}
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={processLogin}>LOGIN</button>
                    <p className="forgot">Forget password?</p>
                </div>
            </div>
        </div>
    );
}

export default Login;