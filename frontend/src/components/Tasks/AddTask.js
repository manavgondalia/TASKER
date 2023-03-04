import { Button, TextField, } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import axios from 'axios';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './Task.css';

// const URL = "http://localhost:5000/tasks/"
const URL = process.env.REACT_APP_SERVER_URL;

const AddTask = (props) => {

    const [input, setInput] = useState({
        taskdetail: "",
        dateofcreation: Date(),
        completed: false
    })

    const handleChange = (e) => {
        // console.log(e.target.value);
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    var taskitem;
    const sendRequest = async () => {
        const res = await axios.post(URL, {
            taskdetail: String(input.taskdetail),
            dateofcreation: Date(),
            completed: false
        });
        taskitem = res.data.task;
        console.log(taskitem);
        try {
            props.parentCall(taskitem)

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box className="add-task-box">
                <TextField className="add-task-field" onChange={handleChange} margin='normal' label="I have to..." variant="outlined" name='taskdetail' />
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
    )
}

export default AddTask
