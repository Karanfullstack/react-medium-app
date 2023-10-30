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
import PostDetails from "./pages/PostDetails.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: (
					<AuthProtected authentication>
						<AllPosts />
					</AuthProtected>
				),
			},
			{
				path: "/login",
				element: (
					<AuthProtected authentication={false}>
						<Login />
					</AuthProtected>
				),
			},
			{
				path: "/signup",
				element: (
					<AuthProtected authentication={false}>
						<Signup />
					</AuthProtected>
				),
			},
			{
				path: "/add-post",
				element: (
					<AuthProtected authentication>
						<AddPost />
					</AuthProtected>
				),
			},
			{
				path: "/post/:slug",
				element: (
					<AuthProtected authentication>
						<PostDetails />
					</AuthProtected>
				),
			},
			{
				path: "/edit-post/:slug",
				element: (
					<AuthProtected authentication>
						<EditPost />
					</AuthProtected>
				),
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
