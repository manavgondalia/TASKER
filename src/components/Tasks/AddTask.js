import { Button, TextField, } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore'
import AddTaskIcon from '@mui/icons-material/AddTask';
import './Task.css';

const AddTask = (props) => {

    const [input, setInput] = useState({
        description: "",
        completed: false,
        userid: props.user.uid
    })

    const itemcollectionRef = collection(db, "task-items");

    const handleChange = (e) => {
        console.log(e.target.value);
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const sendRequest = async () => {
        const newTaskItem = {
            description: input.description,
            completed: input.completed,
            userid: input.userid
        }
        await addDoc(itemcollectionRef, newTaskItem);
        try {

            props.parentCall(newTaskItem);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box className="add-task-box">
                    <TextField className="add-task-field" onChange={handleChange} margin='normal' label={"Hey " + props.user.email + "! Think here"} variant="outlined" name='description' />
                    <Button
                        sx={{ color: "black", "&:hover": { color: "green", backgroundColor: "#EAFFD0" } }}
                        variant="text"
                        className='mb-2'
                        type="submit"
                        endIcon={<AddTaskIcon />}>
                        Add Task
                    </Button>
                </Box>
            </form >
        </div>
    )
}

export default AddTask