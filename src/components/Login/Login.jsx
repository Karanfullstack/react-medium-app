import React, {useState} from "react";
import {Button, Input, Logo} from "../../common";
import authService from "../../services/authService";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login as authLogin} from "../../features/authSlice/authSlice";
import toast from "react-hot-toast";
const Login = () => {
	const dispatch = useDispatch();
	const {register, reset, handleSubmit} = useForm();
	const [loading, setLoading] = useState(false);

	// Handling Login Logic
	const handelLogin = async (data) => {
		setLoading(true);
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.currentUser();
				if (userData) {
					dispatch(authLogin(userData));
					toast.success("Logged In Sucessfully");
					reset();
					{
						/* TODO: REDIRECT TO HOME PAGE */
					}
				}

				setLoading(false);
			}
		} catch (error) {
			toast.error(error.message);
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
				Sign your account
			</h2>

			{/* TODO:  Error Show */}

			<form onSubmit={handleSubmit(handelLogin)} className="mt-8">
				<div className="space-y-5">
					<Input
						label="Enter Your Email"
						type="email"
						placeholder="Enter your email"
						{...register("email")}
					/>

					<Input
						type="password"
						label="Enter Your Password"
						placeholder="Enter Your Password"
						{...register("password")}
					/>
					<Button
						disabled={loading}
						type="submit"
						className=" bg-gray-800 hover:bg-slate-400"
					>
						{loading ? "Processing" : "Submit"}
					</Button>
				</div>
			</form>
			<p className="mt-5 text-center text-base text-white/60">
				Don&apos;t have any account?&nbsp;
				<span>Signup</span> {/* TODO: Wrap with Link */}
			</p>
		</div>
	);
};

export default Login;
