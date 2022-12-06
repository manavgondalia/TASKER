import { IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import AddTask from '../AddTask';
import Task from './Task';
import './Task.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import Completed from './Completed';

// const URL = "http://localhost:5000/tasks/"
const URL = process.env.REACT_APP_SERVER_URL;

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data)
}

const Tasks = () => {

    const [tasks, setTasks] = useState();

    useEffect(() => {
        fetchHandler().then(data => setTasks(data.tasks))
    }, []);

    const handleCall = (childData) => {
        const newlist = [...tasks, childData];
        setTasks(newlist);
    }

    const handleCheck = (childData) => {
        const newlist = tasks.map((taskitem) => {
            if (taskitem._id === childData._id) {
                const updatetaskitem = {
                    ...taskitem,
                    completed: !taskitem.completed,
                };
                return updatetaskitem;
            }
            return taskitem;
        });
        setTasks(newlist);
    }

    return (
        <div className='text-align-center mx-auto mt-5 px-4 pb-1' style={{ maxHeight: 450, maxWidth: "fit-content", backgroundColor: "#F9ED69", borderRadius: 10, overflowY: "auto" }}>
            <ul className='ps-0'>
                <div>
                    <AddTask parentCall={handleCall} />
                </div>
                {
                    tasks && tasks.map((task, i) => (
                        <div key={task._id} >
                            <Task parentCall={handleCheck} task={task} list={tasks} element=
                                {
                                    <IconButton variant='outlined' onClick={
                                        async () => {
                                            const newlist = tasks.filter((item) => item._id !== task._id);
                                            setTasks(newlist);
                                            await axios.delete(`${URL}${task._id}`).then(res => res.data);
                                        }}>
                                        <RemoveCircleOutlineIcon fontSize='inherit' style={{ color: "red" }} />
                                    </IconButton>
                                }
                            />
                        </div>
                    ))
                }
                <div>
                    <Completed tasklist={tasks} />
                </div>
            </ul >
        </div >
    );
}

export default Tasks
