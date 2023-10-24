import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../features/authSlice/authSlice";
import authService from "../services/authService";

const LogoutBtn = () => {
	const dispatch = useDispatch();

	// Logout handler
	const logoutHandler = () => {
		authService
			.logout()
			.then(() => {
				dispatch(logout());
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<button
			onClick={logoutHandler}
			className="inline-block px-6 py-2 duration-200 hover:bg-gray-950 rounded-lg"
		>
			Logout
		</button>
	);
};

export default LogoutBtn;
