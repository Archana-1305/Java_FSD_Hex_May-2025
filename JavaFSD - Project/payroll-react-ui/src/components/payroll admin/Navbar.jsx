import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUserDetails } from "../../store/actions/UserAction";

function Navbar() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(deleteUserDetails());
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">EMPRA Payroll Admin</div>
      <div>
        Welcome  {user.role}
        &nbsp;&nbsp;
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;