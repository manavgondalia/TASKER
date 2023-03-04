import { Button, TextField, } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import AddTaskIcon from '@mui/icons-material/AddTask';
import './Tasks/Task.css'

// const URL = "http://localhost:5000/tasks/"
const URL = process.env.REACT_APP_SERVER_URL;

const AddTask = (props) => {

    const history = useNavigate();

    const [input, setInput] = useState({
        taskdetail: "",
        dateofcreation: Date(),
        completed: false
    })

    const handleChange = (e) => {
        setInput((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    var taskitem;
    const sendRequest = async () => {
        await axios.post(URL, {
            taskdetail: String(input.taskdetail),
            dateofcreation: Date(),
            completed: false
        }).then((res) => (
            taskitem = (res.data.task)
        ));
        try {
            props.parentCall(taskitem)

        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/tasks"));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent={"center"}
                alignContent={"center"}
                alignSelf="center"
                marginLeft={"auto"}
                marginRight={"auto"}
                marginTop={4}
            >
                <TextField style={{
                    backgroundColor: "#EEEEEE"
                }} fullWidth id="outlined-basic" onChange={handleChange} margin='normal' label="I have to..." variant="outlined" name='taskdetail'
                />
                <Button
                    sx={{ color: "black", "&:hover": { color: "green", backgroundColor: "#EAFFD0" } }}
                    variant="text"
                    className='mb-2 add-task-button'
                    type="submit"
                    endIcon={<AddTaskIcon />}>
                    Add Task
                </Button>
            </Box>
        </form >
    )
}

export default AddTask
