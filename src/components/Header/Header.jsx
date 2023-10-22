import React from "react";
import Container from "../../container/Container";
import {Logo, LogoutBtn, Button} from "../../common";
import {useSelector} from "react-redux";

const Header = () => {
	const authStatus = useSelector((state) => state.auth.status);
	// TODO: NAVIGATION TO URL
	// Nav Items
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},
		{
			name: "Login",
			slug: "/login",
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup",
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts",
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: authStatus,
		},
	];

	return (
		<header className="py-3 shadow bg-gray-900">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Logo className="text-3xl" />
					</div>

					<ul className="flex gap-7 items-center ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li className="list-none" key={item.name}>
									<Button>{item.name}</Button>
								</li>
							) : null
						)}
						{authStatus && (
							<li>
								<LogoutBtn />
							</li>
						)}
					</ul>
          
				</nav>
			</Container>
		</header>
	);
};

export default Header;
