import React from "react";

const TextInput = (props) => {
	const {
		label,
		type,
		disabled,
		onChange,
		isValid,
		needsValidation,
		errorType,
		errorMessage,
		value,
		placeholder,
		name,
	} = props;

	return (
		<>
			<div className="relative mt-2">
				<input
					type={type}
					itemID="floating_outlined"
					className="font-chivo block px-2.5 pb-2 pt-2 w-full text-gray-900 appearance-none rounded-lg border border-black focus:outline-1 focus:ring-0 focus:border-blue-600 peer"
					onChange={onChange}
					disabled={disabled}
					value={value}
					placeholder={placeholder === undefined ? " " : placeholder}
					name={name}
				/>
				<label
					htmlFor="floating_outlined"
					className="bg-white font-chivo absolute font-semibold text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
				>
					{label}
				</label>
			</div>
			{needsValidation && !isValid ? (
				<p className="font-chivo text-red-700 font-light text-center mt-1 text-sm">
					<span className="font-bold">{errorType} </span>
					{errorMessage}.
				</p>
			) : null}
		</>
	);
};

export default TextInput;
