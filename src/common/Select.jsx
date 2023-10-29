import React, {forwardRef, useId} from "react";

const Select = (
	{options, defaultValue, label, className = "", ...props},
	ref
) => {
	const id = useId();
	return (
		<div className="w-full">
			{label && <label className="" htmlFor={id}></label>}
			<select
				{...props}
				id={id}
				ref={ref}
				defaultValue={defaultValue}
				className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-200 duration-200 border border-gray-200 w-full ${className}`}
			>
				{options?.map((option) => (
					<option value={option} key={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};

export default forwardRef(Select);
