import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { NavLink } from "react-router-dom";
import './Home.css';

const Header = () => {
    const [value, setValue] = useState();
    return (
        <div>
            <AppBar sx={{ backgroundColor: "#222831" }} position='sticky' >
                <Toolbar>
                    <NavLink to="/" style={{ color: "white", textDecoration: "none" }}>
                        <Typography>
                            <span className='logo-text' style={{ fontSize: 35 }}>  TASKER</span>
                        </Typography>
                    </NavLink>
                    <Tabs sx={{ ml: "auto" }} textColor="inherit" indicatorColor='primary' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={NavLink} to="/tasks" label="Tasks" />
                        <Tab LinkComponent={NavLink} to="/about" label="About" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default Header