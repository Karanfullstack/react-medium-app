import React from "react";

const Button = ({
	children,
	type = "button",
	className = "",
	textColor = "text-white",
	...props
}) => {
	return (
		<button
			type={type}
			className={`${textColor} px-4 py-2 rounded-lg ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
