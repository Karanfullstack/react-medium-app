import React, {forwardRef, useId} from "react";

const Input = (
	{label, labelClass = "", type = "text", className = "", ...props},
	ref
) => {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label className={`mb-3  inline-block ${labelClass}`} htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`${className}focus:outline-blue-300  w-full p-3 text-md rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border   `}
				{...props}
				ref={ref}
				id={id}
			/>
		</div>
	);
};

export default forwardRef(Input);
