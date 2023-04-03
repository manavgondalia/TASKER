import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormLabel, Typography } from '@mui/material';

const Completed = (props) => {

    const tasklist = props.tasklist;

    var totaltasks = 0, completedtasks = 0;
    if (tasklist) {
        totaltasks = tasklist.length;
        for (let i = 0; i < tasklist.length; i++) {
            const task = tasklist[i];
            completedtasks += (task.completed);
        }
    }

    var done = false;
    if (completedtasks === totaltasks) {
        done = true;
    }

    return (
        <div className="p-1 text-center tracker">
            <FormLabel >Completed: <span>{completedtasks} out of {totaltasks} <br></br>{done && <Typography >Done for the day, Wohoo! <span role="img" aria-label="party">🎉</span></Typography>}</span ></FormLabel>
        </div>
    )
}

export default Completed