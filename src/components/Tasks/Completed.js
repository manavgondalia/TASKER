import React from "react";

const Completed = (props) => {
	const tasklist = props.tasklist;

	var totaltasks = 0,
		completedtasks = 0;
	if (tasklist) {
		totaltasks = tasklist.length;
		for (let i = 0; i < tasklist.length; i++) {
			const task = tasklist[i];
			completedtasks += task.completed;
		}
	}

	var done = false;
	if (completedtasks === totaltasks) {
		done = true;
	}

	return (
		<div className="font-chivo p-1 text-center rounded-lg bg-[#F6F6F6]">
			<span>Completed: </span>
			<span>
				{completedtasks} out of {totaltasks}{" "}
			</span>
			{done && (
				<div className="font-chivo">
					Done for the day, Wohoo!{" "}
					<span role="img" aria-label="party">
						🎉
					</span>
				</div>
			)}
		</div>
	);
};

export default Completed;
