import {useState, useEffect} from "react";
import {Header, Footer, Login} from "./components";
import {useDispatch} from "react-redux";
import authService from "./services/authService";
import {login, logout} from "./features/authSlice/authSlice";
import {Loading} from "./common";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import "./App.css";

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

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

	return !loading ? (
		<div className=" min-h-screen flex justify-center flex-wrap  bg-gray-900">
			<div className="  w-full  text-white">
				<Header />
				<main>{/* TODO: <Outlet/> */}</main>

				<AddPost />
				<Footer />
			</div>
		</div>
	) : (
		<Loading />
	);
}

export default App;
