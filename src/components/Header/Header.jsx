import React from "react";
import Container from "../../container/Container";
import {LogoutBtn, Button} from "../../common";
import {useSelector} from "react-redux";
import {ImBlogger2} from "react-icons/im";
import {useNavigate} from "react-router-dom";
const Header = () => {
	const {status, userData} = useSelector((state) => state.auth);
	const navigate = useNavigate();
	console.log(userData);

	// Nav Items
	const navItems = [
		{
			name: "Login",
			slug: "/login",
			active: !status,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !status,
		},
		{
			name: "All Posts",
			slug: "/",
			active: status,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: status,
		},
	];

	return (
		<header className="py-4 shadow bg-gray-900">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<div className="flex gap-2">
							<ImBlogger2
								className={` text-4xl duration-200   ${
									status ? "text-red-300" : "text-orange-300"
								}`}
							/>
							<span className="inline text-3xl tracking-wide text-center">
								logger
							</span>
						</div>
					</div>

					<ul className="flex gap-7 items-center ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li className="list-none" key={item.name}>
									<Button onClick={() => navigate(item.slug)}>
										{item.name}
									</Button>
								</li>
							) : null
						)}
						{status && (
							<div className="flex gap-4 items-center">
								<li className=" bg-red-400 rounded-lg px-2 py-1">
									{userData?.email}
								</li>
								<li>
									<LogoutBtn className="bg-orange-200" />
								</li>
							</div>
						)}
					</ul>
				</nav>
			</Container>
		</header>
	);
};

export default Header;
