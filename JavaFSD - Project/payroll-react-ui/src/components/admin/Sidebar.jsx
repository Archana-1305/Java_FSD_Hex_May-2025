import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [taxSlabOpen, setTaxSlabOpen] = useState(false);
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [payrollOpen, setPayrollOpen] = useState(false);
  const location = useLocation();

  return (
    <nav id="sidebar">
      <ul>
        <li>
          <span className="logo">EMPRA</span>
          <button
            id="toggle-btn"
            onClick={() => {
              document.getElementById("sidebar").classList.toggle("close");
              setSettingsOpen(false);
              setConfigOpen(false);
              setTaxSlabOpen(false);
              setAttendanceOpen(false);
              setPayrollOpen(false);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/>
            </svg>
          </button>
        </li>
        <li className={location.pathname === "/admin" ? "active" : ""}>
          <Link to="/admin">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span>Home</span>
          </Link>
        </li>
        {/* Config dropdown */}
        <li>
          <button
            className={`dropdown-btn${configOpen ? " rotate" : ""}`}
            onClick={() => setConfigOpen(!configOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#e8eaed" viewBox="0 0 24 24" style={{ marginRight: 6, verticalAlign: 'middle' }}>
                <path d="M10 2h4a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v2H4V8a2 2 0 0 1 2-2h2V4a2 2 0 0 1 2-2zm0 2v2h4V4h-4zm-6 8h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8zm4 2v4h2v-4h-2zm4 0v4h2v-4h-2z"/>
            </svg>
            <span>Config</span>
          </button>
          <ul className={`sub-menu${configOpen ? " show" : ""}`}>
            <div>
              <li className={location.pathname.startsWith("/admin/department") ? "active" : ""}>
                <Link to="/admin/department">
                  HRMS
                </Link>
              </li>
            </div>
          </ul>
        </li>
        {/* Settings dropdown */}
        <li>
          <button
            className={`dropdown-btn${settingsOpen ? " rotate" : ""}`}
            onClick={() => setSettingsOpen(!settingsOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M520-640v-160q0-17 11.5-28.5T560-840h240q17 0 28.5 11.5T840-800v160q0 17-11.5 28.5T800-600H560q-17 0-28.5-11.5T520-640ZM120-480v-320q0-17 11.5-28.5T160-840h240q17 0 28.5 11.5T440-800v320q0 17-11.5 28.5T400-440H160q-17 0-28.5-11.5T120-480Zm400 320v-320q0-17 11.5-28.5T560-520h240q17 0 28.5 11.5T840-480v320q0 17-11.5 28.5T800-120H560q-17 0-28.5-11.5T520-160Zm-400 0v-160q0-17 11.5-28.5T160-360h240q17 0 28.5 11.5T440-320v160q0 17-11.5 28.5T400-120H160q-17 0-28.5-11.5T120-160Zm80-360h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" />
            </svg>
            <span>Settings</span>
          </button>
          <ul className={`sub-menu${settingsOpen ? " show" : ""}`}>
            <div>
              <li>
                <Link to="/admin/company-details">
                  Company Details
                </Link>
              </li>
              <li>
                <Link to="/admin/payroll-policies">
                  Payroll Policies
                </Link>
              </li>
              <li>
                <Link to="/admin/allowances">
                  Allowance
                </Link>
              </li>
            </div>
          </ul>
        </li>
        {/* Tax Slab dropdown */}
        <li>
          <button
            className={`dropdown-btn${taxSlabOpen ? " rotate" : ""}`}
            onClick={() => setTaxSlabOpen(!taxSlabOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#e8eaed" viewBox="0 0 24 24" style={{ marginRight: 6, verticalAlign: 'middle' }}>
              <path d="M3,21V19H21V21H3M3,17V15H21V17H3M3,13V11H21V13H3M3,9V7H21V9H3Z"/>
            </svg>
            <span>Tax Slab</span>
          </button>
          <ul className={`sub-menu${taxSlabOpen ? " show" : ""}`}>
            <div>
              <li className={location.pathname.startsWith("/admin/income-tax") ? "active" : ""}>
                <Link to="/admin/income-tax">
                  Income Tax Slab
                </Link>
              </li>
            </div>
          </ul>
        </li>
        {/* Attendance with dropdown */}
        <li>
          <button
            className={`dropdown-btn${attendanceOpen ? " rotate" : ""}`}
            onClick={() => setAttendanceOpen(!attendanceOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 20a9 9 0 1 1 9-9a9 9 0 0 1-9 9zm1-15h-2v6l5.25 3.15l1-1.65l-4.25-2.5V6z"/>
            </svg>
            <span>Attendance</span>
          </button>
          <ul className={`sub-menu${attendanceOpen ? " show" : ""}`}>
            <div>
              <li className={location.pathname.startsWith("/admin/attendance") ? "active" : ""}>
                <Link to="/admin/attendance"> Add Attendance </Link>
              </li>
             
            </div>
          </ul>
        </li>
        {/* Payroll with dropdown for Run Payroll and Revise Payroll */}
        <li>
          <button
            className={`dropdown-btn${payrollOpen ? " rotate" : ""}`}
            onClick={() => setPayrollOpen(!payrollOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M17 4v2H7V4H3v16h18V4zm0 14H7v-2h10zm2-4H5V8h14zm-7-2a2 2 0 1 1 2-2A2 2 0 0 1 12 12z"/>
            </svg>
            <span>Payroll</span>
          </button>
          <ul className={`sub-menu${payrollOpen ? " show" : ""}`}>
            <div>
              <li className={location.pathname.startsWith("/admin/payroll/run") ? "active" : ""}>
                <Link to="/admin/payroll/run">Run Payroll</Link>
              </li>
              <li className={location.pathname.startsWith("/admin/payroll/revise") ? "active" : ""}>
                <Link to="/admin/payroll/revise">Revise Payroll</Link>
              </li>
              
            </div>
          </ul>
        </li>
        {/* Requests */}
        <li className={location.pathname.startsWith("/admin/requests") ? "active" : ""}>
          <Link to="/admin/notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#e8eaed" viewBox="0 0 24 24">
              <path d="M4 4h16v2H4zm0 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4z"/>
            </svg>
            <span>Notification</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;