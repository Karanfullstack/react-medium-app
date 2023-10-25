import React, {useEffect} from "react";
import {useSelector} from "react-redux";

/* TODO: PROTECTED ROUTE IMPLEMENTATION */

const AuthProtected = ({children, authentication = true}) => {
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			console.log("Redirect To Login Page");
		} else if (!authentication && authStatus !== authentication) {
			console.log("Redirect To Home");
		}
	}, [authStatus, authentication]);
	return <>{children}</>;
};

export default AuthProtected;
