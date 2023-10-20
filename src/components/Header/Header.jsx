import React from "react";
import {Container, Logo, LogoutBtn} from "../../components/index";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const Header = () => {
	const status = false
	const navigate = useNavigate();
	
	const navItems = [
		{
			name: "Home",
			slug: "/",
			active: true,
		},

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
			slug: "/all-posts",
			active: status,
		},
		{
			name: "Add Post",
			slug: "/add-post",
			active: status,
		},
	];

	return (
		<header className="py-3 shadow bg-gray-500">
			<Container>
				<nav className="flex">
					<div className="mr-4">
						<Link to="/">
							<Logo width="70px" />
						</Link>
					</div>
					<ul className="flex ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button onClick={() => navigate(item.slug)}>
										{item.name}
									</button>
								</li>
							) : null
						)}

						{status && (
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
