import React from "react";

const Completed = (props) => {
	const tasklist = props.tasklist;

	let totalTasks = 0,
		completedTasks = 0;

	if (tasklist) {
		totalTasks = tasklist.length;
		for (let i = 0; i < tasklist.length; i++) {
			const task = tasklist[i];
			completedTasks += task.completed;
		}
	}

	let done = false;
	if (completedTasks === totalTasks) {
		done = true;
	}

	return (
		<div className="font-chivo p-1 text-center rounded-lg bg-[#F6F6F6]">
			<span>Completed: </span>
			<span>
				{completedTasks} out of {totalTasks}{" "}
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
