import { Checkbox, IconButton, FormControlLabel, Button, } from '@mui/material';
import { db, auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import AddTask from './AddTask';
import './Task.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import 'bootstrap/dist/css/bootstrap.min.css';
import Completed from './Completed';
import Auth from '../Auth';

const Tasks = () => {

    const [tasks, setTasks] = useState();
    const itemcollectionRef = collection(db, "task-items");

    const [user, setUser] = useState({});

    useEffect(() => {
        getItems();
    }, [tasks, user]);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

    }, [])

    const getItems = async () => {
        const q = query(itemcollectionRef, where("userid", "==", String(user.uid)));
        const data = await getDocs(q);
        setTasks(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const addTask = (childData) => {
        const newlist = [...tasks, childData];
        setTasks(newlist);
    }

    const completeTask = async (id, completed) => {
        const taskToUpdate = doc(db, "task-items", id);
        const newField = { completed: !completed };
        await updateDoc(taskToUpdate, newField);
    }

    const deleteTask = async (id) => {
        const taskToDelete = doc(db, "task-items", id);
        await deleteDoc(taskToDelete);
    }

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <div>
            {user ?
                <div className='task-wrapper'>
                    <div className='task-card text-align-center mx-auto mt-5 px-4 pb-1 '>
                        <div>
                            <AddTask user={user} parentCall={addTask} />
                        </div>
                        <ul className='ps-0'>
                            {
                                tasks && tasks.map((task) => (
                                    <div className={'container task-container mb-2 task-item' + (task.completed ? " completed-task" : "")} key={task.id} >
                                        <FormControlLabel style={{ maxWidth: 225 }} control={<Checkbox checked={task.completed} onChange={() => completeTask(task.id, task.completed)} />} label={task.description} />
                                        <IconButton className='delete-icon' variant='outlined' onClick={() => deleteTask(task.id)}>
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
                    <Button
                        sx={{ color: "black", "&:hover": { color: "white", backgroundColor: "#1C3879" } }}
                        variant="text"
                        className='mt-1 mb-2 mx-auto'
                        type="submit"
                        onClick={logout}>
                        SIGN OUT
                    </Button>
                </div>
                :
                <Auth />
            }
        </div>
    )
}

export default Tasks
