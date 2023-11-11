import React, {useState} from "react";
import {Button, Input} from "../../common";
import authService from "../../services/authService";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {login as authLogin} from "../../features/authSlice/authSlice";
import {ImBlogger2} from "react-icons/im";
import toast from "react-hot-toast";
import "../../App.css";
import {useNavigate, Link} from "react-router-dom";

const Login = () => {
	const dispatch = useDispatch();
	const {register, reset, handleSubmit} = useForm();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	// Handling Login Logic
	const handelLogin = async (data) => {
		setLoading(true);
		try {
			const session = await authService.login(data);
			if (session) {
				const userData = await authService.currentUser();
				if (userData.email) {
					dispatch(authLogin({userData}));
					toast.success("Logged In Sucessfully");
					reset();
					navigate("/");
				}

				setLoading(false);
			}
		} catch (error) {
			toast.error(error.message);
			setLoading(false);
		}
	};

	return (
		<div className="flex mt-6  flex-col items-center pb-4 justify-center w-full">
			<div className="mb-6 flex justify-center">
				<span className="inline-block w-full max-w-[100px]">
					<ImBlogger2
						className={`text-5xl text-orange-300 ${loading ? "rotating" : ""}`}
					/>
				</span>
			</div>
			<h2 className="text-center tracking-wide text-2xl font-bold leading-tight">
				Sign your account
			</h2>

			<form onSubmit={handleSubmit(handelLogin)} className="mt-8">
				<div className="space-y-5">
					<Input
						label="Enter Your Email"
						type="email"
						placeholder="Enter your email"
						{...register("email")}
						labelClass="tracking-wide text-gray-400  "
					/>

					<Input
						type="password"
						label="Enter Your Password"
						placeholder="Enter Your Password"
						labelClass="tracking-wide text-gray-400 text-md"
						{...register("password")}
					/>
					<Button
						disabled={loading}
						type="submit"
						className=" bg-gray-800 duration-200 hover:bg-slate-400"
					>
						{loading ? "Processing..." : "Login"}
					</Button>
				</div>
			</form>
			<p className="mt-5 text-center text-base text-white/60">
				Don&apos;t have any account?&nbsp;
				<Link to="/signup">
					<span>Signup</span>
				</Link>
			</p>
		</div>
	);
};

export default Login;
