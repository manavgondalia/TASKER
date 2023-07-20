import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./Task.css";
import TextInput from "../../elements/TextInput";
import Button from "../../elements/Button";
import { MdTaskAlt } from "react-icons/md";

const AddTask = (props) => {
	const [input, setInput] = useState({
		description: "",
		completed: false,
		userid: props.user.uid,
	});

	const itemcollectionRef = collection(db, "task-items");

	const handleChange = (e) => {
		console.log(e.target.value);
		setInput((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const sendRequest = async () => {
		const newTaskItem = {
			description: input.description,
			completed: input.completed,
			userid: props.user.uid,
		};
		await addDoc(itemcollectionRef, newTaskItem);
		try {
			props.parentCall(newTaskItem);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		sendRequest();
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
					/>
					<Button
						className="mb-2 p-2 ml-2 h-fit hover:bg-[#A2FF86] hover:text-black ring-0 hover:ring-1"
						type="submit"
						label={<MdTaskAlt className="mx-auto text-2xl" />}
					/>
				</div>
			</form>
		</div>
	);
};

export default AddTask;
