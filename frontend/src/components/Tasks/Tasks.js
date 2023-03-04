import { Checkbox, IconButton, FormControlLabel } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import './Task.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import Completed from './Completed';

// const URL = "http://localhost:5000/tasks/"
const URL = process.env.REACT_APP_SERVER_URL;

const Tasks = () => {

    const [tasks, setTasks] = useState();

    useEffect(() => {
        getTasks();
    }, []);

    const fetchHandler = async () => {
        return await axios.get(URL).then((res) => res.data);
    }
    const getTasks = () => {
        fetchHandler()
            .then((data) => setTasks(data.tasks));
    }

    const addTask = (childData) => {
        const newlist = [...tasks, childData];
        setTasks(newlist);
    }

    const completeTask = async (id) => {
        console.log("ID => ", id);
        const updated_task = await axios.put(`${URL}${id}`).then(res => res.data);
        console.log(updated_task.task);
        setTasks(tasks => tasks.map(task => {
            if (task._id === updated_task.task._id) {
                task.completed = updated_task.task.completed;
            }
            return task;
        }));
    }

    const deleteTask = async (task) => {
        await axios.delete(`${URL}${task._id}`).then(res => res.data);
        const newlist = tasks.filter((item) => item._id !== task._id);
        setTasks(newlist);
    }

    return (
        <div className='card text-align-center mx-auto mt-5 px-4 pb-1 '>
            <ul className='ps-0'>
                <div>
                    <AddTask parentCall={addTask} />
                </div>
                {
                    tasks && tasks.map((task) => (
                        <div className={'container mb-2 task-item' + (task.completed ? " completed-task" : "")} key={task._id}  >
                            <FormControlLabel onClick={() => completeTask(task._id)} style={{ maxWidth: 225 }} control={<Checkbox checked={task.completed} />} label={task.taskdetail} />
                            <IconButton className='delete-icon' variant='outlined' onClick={() => deleteTask(task)}>
                                <RemoveCircleOutlineIcon fontSize='inherit' style={{ color: "red" }} />
                            </IconButton>
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
