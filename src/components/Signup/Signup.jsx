import React, {useState} from "react";
import {Button, Input, Logo} from "../../common";
import authService from "../../services/authService";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login} from "../../features/authSlice/authSlice";
import {Link} from "react-router-dom";
import {ImBlogger2} from "react-icons/im";
const Signup = () => {
	const {register, reset, handleSubmit} = useForm();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	// Handling Login Logic
	const HandelSignup = async (data) => {
		setError("");
		setLoading(true);
		try {
			const session = await authService.createAccount(data);
			if (session) {
				const userData = authService.currentUser();
				if (userData) {
					console.log("User Created Sucessfully");
					dispatch(login(userData));
					setLoading(false);
					reset();
				}
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
					<ImBlogger2
						className={`text-5xl text-orange-300 ${loading ? "rotating" : ""}`}
					/>
				</span>
			</div>
			<h2 className="text-center text-2xl font-bold leading-tight">
				Sign Up Account
			</h2>

			{error && <p className="text-red-600 mt-8 text-center">{error}</p>}
			<form onSubmit={handleSubmit(HandelSignup)} className="mt-8">
				<div className="space-y-5">
					<Input
						labelClass="tracking-wide text-gray-400 text-md"
						type="text"
						{...register("name")}
						placeholder="name"
						label="Enter Your Name"
					/>
					<Input
						labelClass="tracking-wide text-gray-400 text-md"
						label="Enter Your Email"
						type="email"
						placeholder="Enter your email"
						{...register("email")}
					/>
					{/* TODO: VALIDATION REGEX EMAIL */}
					<Input
						labelClass="tracking-wide text-gray-400 text-md"
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
				<Link to="/login">
					<span>Sign In</span>
				</Link>
			</p>
		</div>
	);
};

export default Signup;
