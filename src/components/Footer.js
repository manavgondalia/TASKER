import React from "react";
import "./Footer.css";
import { BsSuitHeartFill } from "react-icons/bs";

const Footer = () => {
	return (
		<div className="footer">
			<p className="mb-0 font-chivo font-medium">
				With <BsSuitHeartFill className="inline-block text-[#ff0000]" /> by{" "}
				<a
					href="https://github.com/manavgondalia/"
					className="animate-text text-inherit hover:text-inherit no-underline"
				>
					{" "}
					Manav P Gondalia{" "}
				</a>
			</p>
		</div>
	);
};

export default Footer;
