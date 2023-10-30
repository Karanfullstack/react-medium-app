import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const AuthProtected = ({children, authentication = true}) => {
	const authStatus = useSelector((state) => state.auth.status);
	const navigate = useNavigate();
	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}
	}, [authStatus, authentication]);
	return <div>{children}</div>;
};

export default AuthProtected;
