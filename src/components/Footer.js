import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<div className="footer">
			<p className="mb-0 font-chivo font-medium">
				&copy; {new Date().getFullYear()}{" "}
				<a
					href="https://github.com/manavgondalia/"
					className="animate-text"
					style={{ color: "inherit", textDecoration: "none" }}
				>
					{" "}
					Manav P Gondalia{" "}
				</a>
			</p>
		</div>
	);
};

export default Footer;
