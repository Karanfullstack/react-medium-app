import {configureStore} from "@reduxjs/toolkit";
import authSlice from "../features/authSlice/authSlice";

const store = configureStore({
	reducer: {authSlice},
});

export default store;
