import React from "react";
// import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<div>
			<header className="w-full flex px-3 py-2 bg-[#222831] items-center justify-between shadow-lg shadow-primary-dark/30 top-0">
				<div className="items-center">
					<h3 className="text-white font-alice mb-0">TASKER</h3>
				</div>
				<div className="flex text-white">
					<p className="px-2 font-chivo mb-0">Tasks</p>
					<p className="px-2 font-chivo mb-0">User Name</p>
				</div>
			</header>
		</div>
	);
};

export default Header;
