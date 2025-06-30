import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import PayslipReducer from "./reducers/PayslipReducer";

const store = configureStore({
    reducer: {
        user: UserReducer,
        payslips: PayslipReducer
    }
});

export default store;