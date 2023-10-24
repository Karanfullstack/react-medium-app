import React, {forwardRef, useId} from "react";

const Input = ({label, type = "text", className = "", ...props}, ref) => {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label className="mb-3  inline-block" htmlFor={id}>
					{label}
				</label>
			)}
			<input
				type={type}
				className={`${className}focus:outline-blue-300  px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border  w-full `}
				{...props}
				ref={ref}
				id={id}
			/>
		</div>
	);
};

export default forwardRef(Input);
