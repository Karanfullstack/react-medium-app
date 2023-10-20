import React from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../features/authSlice";
import authService from "../../appwrite/auth";
function LogoutBtn() {
	const dispatch = useDispatch();
	
	// logout handler
	const logoutHandler = () => {
		authService.logOut().then(() => {
			dispatch(logout());
		});
	};
	return (
		<button
			onClick={logoutHandler}
			className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
		>
			LogoutBtn
		</button>
	);
}

export default LogoutBtn;
