import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../features/authSlice/authSlice";
import authService from "../services/authService";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const LogoutBtn = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	// Logout handler
	const logoutHandler = () => {
		setLoading(true);
		authService
			.logout()
			.then(() => {
				dispatch(logout());
				toast.success("Logout Successfully");
				setLoading(false);
				navigate("/login");
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			})
			.finally(() => setLoading(false));
	};

	return (
		<button
			disabled={loading}
			onClick={logoutHandler}
			className="inline-block px-6 py-2 bg-gray-800 duration-200 hover:bg-gray-700 rounded-lg"
		>
			Logout
		</button>
	);
};

export default LogoutBtn;
