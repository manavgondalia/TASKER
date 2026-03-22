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
import toast, { Toaster } from "react-hot-toast";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const itemcollectionRef = collection(db, "task-items");

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return unsubscribe;
	}, []);

	useEffect(() => {
		if (user) {
			getItems();
		}
		// eslint-disable-next-line
	}, [user]);

	const getItems = async () => {
		try {
			const q = query(itemcollectionRef, where("userid", "==", user.uid));
			const data = await getDocs(q);
			setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		} catch (error) {
			toast.error("Failed to load tasks.");
		} finally {
			setLoading(false);
		}
	};

	const addTask = (childData) => {
		setTasks((prev) => [...prev, childData]);
	};

	const completeTask = async (id, completed) => {
		const taskToUpdate = doc(db, "task-items", id);
		try {
			await updateDoc(taskToUpdate, { completed: !completed });
			setTasks(
				tasks.map((task) =>
					task.id === id ? { ...task, completed: !task.completed } : task
				)
			);
		} catch (error) {
			toast.error("Failed to update task.");
		}
	};

	const deleteTask = async (id) => {
		const taskToDelete = doc(db, "task-items", id);
		try {
			await deleteDoc(taskToDelete);
			setTasks(tasks.filter((task) => task.id !== id));
		} catch (error) {
			toast.error("Failed to delete task.");
		}
	};

	return (
		<div>
			<Toaster />
			<div className="flex flex-col justify-center mx-auto">
				<div className="task-card text-align-center mx-auto mt-5 px-4 pb-1 h-[27rem]">
					<div>
						{user && <AddTask user={user} parentCall={addTask} />}
					</div>
					<div className="flex flex-col justify-between h-[21rem]">
						{loading ? (
							<p className="text-center font-chivo mt-4">Loading tasks...</p>
						) : (
							<ul className="ps-0 ">
								{tasks.map((task) => (
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
						)}
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
