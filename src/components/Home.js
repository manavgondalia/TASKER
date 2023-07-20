import React from "react";
import "./Home.css";

const Home = () => {
	return (
		<div className="text-center mt-5">
			<div className="row max-w-fit m-auto">
				<h1 className="font-chivo font-bold text-[#364F6B]">
					Organize yourself and your work.
				</h1>
			</div>
			<div className="row max-w-fit m-auto">
				<h3 className="font-chivo font-bold text-[#364F6B]">
					Stay focused and relaxed with,{" "}
				</h3>
			</div>
			<div className="font-alice mt-5 px-3 rounded-2xl bg-[#F9ED69] max-w-fit m-auto">
				<p className="text-8xl py-2">TASKER</p>
			</div>
			<br></br>
			<h5 className="font-chivo font-medium text-[#364F6B]">
				Head over to TASKS from navbar :){" "}
			</h5>
		</div>
	);
};

export default Home;
