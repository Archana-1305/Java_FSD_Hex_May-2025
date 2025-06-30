const initialState = {
    payslips: []
};

const PayslipReducer = (state = initialState, action) => {
    if (action.type === "FETCH_ALL_PAYSLIPS") {
        return {
            ...state,
            payslips: action.payload
        };
    }
    return state;
};

export default PayslipReducer;