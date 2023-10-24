import React, {useEffect} from "react";
import {useSelector} from "react-redux";

/* TODO: PROTECTED ROUTE IMPLEMENTATION */

const AuthProtected = ({children, authentication = false}) => {
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authStatus && authStatus !== authentication) {
			console.log("Login Page");
		} else if (!authentication && authStatus !== authentication) {
			console.log("Home Page");
		}
	}, [authStatus, authentication]);
	return <>{children}</>;
};

export default AuthProtected;
