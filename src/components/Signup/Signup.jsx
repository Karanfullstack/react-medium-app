import React, {useState} from "react";
import {Button, Input, Logo} from "../../common";
import authService from "../../services/authService";
import {useForm} from "react-hook-form";

const Signup = () => {
	const {register, handleSubmit} = useForm();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	// Handling Login Logic
	const handelLogin = async (data) => {
		setError("");
		setLoading(true);
		try {
			const session = await authService.createAccount(data);
			if (session) {
				console.log("User Created Sucessfully");
				setLoading(false);
			}
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};
	return (
		<div className="flex  flex-col items-center pb-4 justify-center w-full">
			<div className="mb-6 flex justify-center">
				<span className="inline-block w-full max-w-[100px]">
					<Logo className="text-3xl" />
				</span>
			</div>
			<h2 className="text-center text-2xl font-bold leading-tight">
				Sign Up Account
			</h2>

			{/* TODO:  Error Show */}
			{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
			<form onSubmit={handleSubmit(handelLogin)} className="mt-8">
				<div className="space-y-5">
					<Input
						type="text"
						{...register("name")}
						placeholder="name"
						label="Enter Your Name"
					/>
					<Input
						label="Enter Your Email"
						type="email"
						placeholder="Enter your email"
						{...register("email")}
					/>

					<Input
						type="password"
						label="Enter Your password"
						placeholder="Enter Your Password"
						{...register("password")}
					/>
					<Button type="submit" className=" bg-gray-800">
						{loading ? "Processing" : "Submit"}
					</Button>
				</div>
			</form>
			<p className="mt-5 text-center text-base text-white/60">
				have already an account?&nbsp;
				<span>Sign In</span> {/* TODO: Wrap with Link */}
			</p>
		</div>
	);
};

export default Signup;
