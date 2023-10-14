import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import authService from "./appwrite/auth";
import {login, logout} from "./features/authSlice";
import {Header, Footer} from "./components";
import "./App.css";
import {Outlet} from "react-router-dom";
function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(logout());
				}
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div className="min-h-screen border flex flex-wrap content-between bg-gray-800">
			<div className="w-full jus flex flex-col ">
				<Header />
				<main>
					TODO: <Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App;
