import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const user = auth.currentUser;

	const logout = async () => {
		await signOut(auth);
		navigate("/auth");
	};
	return (
		<div>
			<header className="w-full flex px-3 py-2 bg-[#222831] items-center justify-between shadow-lg shadow-primary-dark/30 top-0">
				<div className="items-center">
					<NavLink className="no-underline text-inherit" to="/">
						<p className="text-white font-alice mb-0 text-2xl">TASKER</p>
					</NavLink>
				</div>
				<div className="flex text-white">
					{user && <p className="px-2 font-chivo mb-0">{user.email}</p>}
					<NavLink className="no-underline text-inherit" to="/tasks">
						<p className="px-2 font-chivo mb-0">Tasks</p>
					</NavLink>
					{user && (
						<p className="px-2 font-chivo mb-0 cursor-pointer" onClick={logout}>
							Sign Out
						</p>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
