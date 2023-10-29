import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Provider} from "react-redux";
import store from "./store/store.js";
import {Toaster} from "react-hot-toast";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import AllPosts from "./pages/AllPosts.jsx";
import AuthProtected from "./common/AuthProtected.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AddPost from "./pages/AddPost.jsx";
import EditPost from "./pages/EditPost.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <AllPosts />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/add-post",
				element: <AddPost />,
			},
			{
				path: "/edit-post/:slug",
				element: <EditPost />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<Toaster position="top-center" />
		<RouterProvider router={router} />
	</Provider>
);
