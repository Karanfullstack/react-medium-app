import {useState, useEffect} from "react";
import {Header, Footer, Login} from "./components";
import {useDispatch} from "react-redux";
import authService from "./services/authService";
import {login, logout} from "./features/authSlice/authSlice";
import {Button, Loading, Select} from "./common";
import "./App.css";
import Post from "./components/Post/Post";
import {useForm} from "react-hook-form";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	const {register, handleSubmit, getValues} = useForm({
		defaultValues: {
			status: "inactive",
		},
	});

	// Check for current user
	useEffect(() => {
		authService
			.currentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({userData}));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				setLoading(false);
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const handelData = (data) => {
		console.log(data);
	};
	return !loading ? (
		<div className=" min-h-screen flex justify-center flex-wrap  bg-gray-900">
			<div className="  w-full  text-white">
				<Header />
				<main>{/* TODO: <Outlet/> */}</main>
				<Post />

				<Footer />
			</div>
		</div>
	) : (
		<Loading />
	);
}

export default App;
