import { db, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { IoRemoveCircleOutline } from "react-icons/io5";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import AddTask from "./AddTask";
import "./Task.css";
import Completed from "./Completed";

const Tasks = () => {
	const [tasks, setTasks] = useState();
	const itemcollectionRef = collection(db, "task-items");
	const [user, setUser] = useState({});

	useEffect(() => {
		getItems();
		// eslint-disable-next-line
	}, [user]);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, []);

	const getItems = async () => {
		console.log("getting data");
		const q = query(itemcollectionRef, where("userid", "==", String(user.uid)));
		const data = await getDocs(q);
		setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
	};

	const addTask = (childData, childDataId) => {
		const newlist = [...tasks, childData];
		setTasks(newlist);
	};

	const completeTask = async (id, completed) => {
		const taskToUpdate = doc(db, "task-items", id);
		const newField = { completed: !completed };
		await updateDoc(taskToUpdate, newField);
		try {
			setTasks(
				// preventing fetching again from firestore
				tasks.map((task) => {
					if (task.id === id) {
						return { ...task, completed: !task.completed };
					}
					return task;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTask = async (id) => {
		const taskToDelete = doc(db, "task-items", id);
		await deleteDoc(taskToDelete);
		try {
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="flex flex-col justify-center mx-auto">
				<div className="task-card text-align-center mx-auto mt-5 px-4 pb-1 h-[27rem]">
					<div>
						<AddTask user={user} parentCall={addTask} />
					</div>
					<div className="flex flex-col justify-between h-[21rem]">
						<ul className="ps-0 ">
							{tasks &&
								tasks.map((task) => (
									<div
										key={task.id}
										className={
											"flex justify-between align-items-center w-full py-1 px-2 mb-2 bg-[#F08A5D] rounded-xl font-chivo" +
											(task.completed ? " completed-task" : "")
										}
									>
										<div
											className="flex items-center justify-end cursor-pointer"
											onClick={() => completeTask(task.id, task.completed)}
										>
											{task.completed ? (
												<ImCheckboxChecked className="text-md" />
											) : (
												<ImCheckboxUnchecked className="text-md" />
											)}
											<span className="ml-2">{task.description}</span>
										</div>
										<IoRemoveCircleOutline
											className="text-2xl my-1 cursor-pointer text-[#ff0000]"
											onClick={() => deleteTask(task.id)}
										/>
									</div>
								))}
						</ul>
						<div>
							<Completed tasklist={tasks} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tasks;
