import React from "react";

const Home = () => {
	return (
		<div className="text-center mt-20">
			<div className="row max-w-fit m-auto">
				<p className="font-chivo font-bold text-[#364F6B] text-5xl">
					Organize what's important{" "}
				</p>
			</div>
			<div className="row max-w-fit m-auto">
				<p className="font-chivo font-bold text-[#364F6B] text-3xl">
					Stay focused and relaxed with,{" "}
				</p>
			</div>
			<div className="font-alice mt-5 px-3 rounded-2xl bg-[#F9ED69] max-w-fit m-auto">
				<p className="text-8xl py-2">TASKER</p>
			</div>
			<br></br>
			<p className="font-chivo font-medium text-[#364F6B] text-xl">
				Head over to <strong>Tasks</strong> from navbar :){" "}
			</p>
		</div>
	);
};

export default Home;
