import {useState, useRef, useEffect} from "react";
import {Header, Footer, Login, Signup} from "./components";
import {useDispatch} from "react-redux";
import authService from "./services/authService";
import {login, logout} from "./features/authSlice/authSlice";
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
				<main>
					{/* TODO: <Outlet/> */}
					<Login />
				</main>
				<Footer />
			</div>
		</div>
	) : (
		<h1>Loading...</h1>
	);
}

export default App;
