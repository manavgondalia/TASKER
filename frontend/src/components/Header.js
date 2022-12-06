import React, { useState } from 'react'
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import { NavLink } from "react-router-dom"

const Header = () => {
    const [value, setValue] = useState();
    return (
        <div>
            <AppBar sx={{ backgroundColor: "#222831" }} position='sticky' >
                <Toolbar>
                    <NavLink to="/" style={{ color: "white" }}>
                        <Typography>
                            <TaskAltIcon />
                        </Typography>
                    </NavLink>
                    <Tabs sx={{ ml: "auto" }} textColor="inherit" indicatorColor='primary' value={value} onChange={(e, val) => setValue(val)}>
                        <Tab LinkComponent={NavLink} to="/tasks" label="Tasks" />
                        <Tab LinkComponent={NavLink} to="/about" label="About Us" />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default Header