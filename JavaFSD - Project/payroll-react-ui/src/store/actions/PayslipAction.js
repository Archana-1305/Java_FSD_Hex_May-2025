import axios from "axios";

// Fetch all payslips for the logged-in employee
export const fetchAllPayslips = (dispatch) => () => {
    const token = localStorage.getItem("token"); // or sessionStorage.getItem("token")
    axios.get("http://localhost:8080/api/payslips/my-payslips", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then(function (response) {
        dispatch({
            type: "FETCH_ALL_PAYSLIPS",
            payload: response.data
        });
    })
    .catch(function (error) {
        console.error("Error fetching payslips:", error);
    });
};