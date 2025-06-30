import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import CompanyDetails from "./components/admin/CompanyDetails";
import DepartmentDetails from "./components/admin/DepartmentDetails";
import AddDepartment from "./components/admin/AddDepartment"; 
import DesignationDetails from "./components/admin/DesignationDetails";
import EmployeeDetails from "./components/admin/EmployeeDetails";
import PayrollPolicies from "./components/admin/PayrollPolicies";
import AllowanceDetails from "./components/admin/AllowanceDetails";
import IncomeTax from "./components/admin/IncomeTax";
import AddDesignation from "./components/admin/AddDesignation";
import AddEmployee from "./components/admin/AddEmployee";
import AdminHome from "./components/admin/AdminHome";
import EditPayrollPolicy from "./components/admin/EditPayrollPolicy";
import Attendance from "./components/admin/Attendance";
import RunPayroll from "./components/admin/RunPayroll";
import RevisePayroll from "./components/admin/RevisePayroll"; 
import PayrollAdminDashboard from "./components/payroll admin/PayrollAdminDashboard";
import PayrollAdminHome from "./components/payroll admin/PayrollAdminHome";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import PayslipList from "./components/employee/PayslipList";
import PayrunApproval from "./components/payroll admin/PayrunApproval";
import ApprovePayslips from "./components/payroll admin/ApprovePayslips";
import ReimbursementRequest from "./components/payroll admin/ReimbursementRequest";
import Notifications from "./components/admin/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="department" element={<DepartmentDetails />} />
          <Route path="department/add/:companyId" element={<AddDepartment />} />
          <Route path="designation/add/:departmentId" element={<AddDesignation />} />
          <Route path="designation/:deptId" element={<DesignationDetails />} />
          <Route path="employee/add/:departmentId/:designationId/:companyId" element={<AddEmployee />} />
          <Route path="employees/:designationId" element={<EmployeeDetails />} />
          <Route path="company-details" element={<CompanyDetails />}>
          </Route>
          <Route path="payroll-policies" element={<PayrollPolicies />} />
          <Route path="/admin/payroll-policies/edit/:id" element={<EditPayrollPolicy />} />
          <Route path="allowances" element={<AllowanceDetails />} />
          <Route path="income-tax" element={<IncomeTax />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="/admin/payroll/run" element={<RunPayroll />} />
          <Route path="/admin/payroll/revise" element={<RevisePayroll />} /> 
          <Route path="/admin/notifications" element={<Notifications/>}/>
        </Route>
        <Route path="/payroll-admin" element={<PayrollAdminDashboard/>}>
          <Route index element={<PayrollAdminHome/>}/>
          <Route path="payrun-approval" element={<PayrunApproval/>}/>
          <Route path="payslip-details/:departmentId/:payrunId" element={<ApprovePayslips/>}/>
          <Route path="request" element={<ReimbursementRequest/>}/>


        </Route>
        <Route path="/employee" element={<EmployeeDashboard/>}>
          <Route path="payslips" element={<PayslipList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;