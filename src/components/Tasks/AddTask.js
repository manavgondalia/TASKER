import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Task.css";
import TextInput from "../../elements/TextInput";
import Button from "../../elements/Button";
import { MdTaskAlt } from "react-icons/md";
import toast from "react-hot-toast";

const MAX_DESCRIPTION_LENGTH = 300;

const AddTask = (props) => {
	const [description, setDescription] = useState("");

	const itemcollectionRef = collection(db, "task-items");

	const handleChange = (e) => {
		setDescription(e.target.value);
	};

	const sendRequest = async (trimmed) => {
		const newTaskItem = {
			description: trimmed,
			completed: false,
			userid: props.user.uid,
		};
		const docRef = await addDoc(itemcollectionRef, newTaskItem);
		newTaskItem.id = docRef.id;
		props.parentCall(newTaskItem);
		setDescription("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const trimmed = description.trim();
		if (!trimmed) {
			toast.error("Task description cannot be empty.");
			return;
		}
		if (trimmed.length > MAX_DESCRIPTION_LENGTH) {
			toast.error(`Task description must be ${MAX_DESCRIPTION_LENGTH} characters or fewer.`);
			return;
		}
		toast.promise(sendRequest(trimmed), {
			loading: "Adding task...",
			success: "Task added!",
			error: "Failed to add task.",
		});
	};

	return (
		<div className="mt-4 mb-2">
			<form onSubmit={handleSubmit}>
				<div className="flex justify-between">
					<TextInput
						type="text"
						className="add-task-field bg-white"
						onChange={handleChange}
						placeholder="Add a task"
						name="description"
						value={description}
					/>
					<Button
						className="mb-2 p-2 ml-2 h-fit hover:bg-[#A2FF86] hover:text-black ring-0 hover:ring-1 ring-black focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-full text-md py-2 text-center my-2"
						type="submit"
						label={<MdTaskAlt className="mx-auto text-2xl" />}
					/>
				</div>
			</form>
		</div>
	);
};

export default AddTask;
