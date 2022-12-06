import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react'
import './Task.css'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// const URL = "http://localhost:5000/tasks/"
const URL = process.env.REACT_APP_SERVER_URL;

const Task = (props) => {

    const { _id, taskdetail, dateofcreation, completed } = props.task;

    const [check, setCheck] = useState(completed);

    const doneHandler = async (e) => {
        console.log("ID=>", _id);
        await axios.put(`${URL}${_id}`, {
            completed: Boolean(!check)
        }).then(res => props.parentCall(res.data.task));
        setCheck(!check);
    }

    const isChecked = () => {
        if (check) {
            return "cbox "
        }
    }

    return (
        <div style={{ alignItems: 'center', borderRadius: 10, minWidth: "fit-content" }} className='container mb-2'>
            <FormControlLabel style={{ maxWidth: 225 }} className={isChecked()} control={<Checkbox checked={check} onChange={doneHandler} />} label={taskdetail} />
            <span style={{ float: "right" }}>{props.element}</span>
        </div>
    )
}

export default Task
