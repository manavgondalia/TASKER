import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    return (
        <div className='text-center mt-5 heading-text'>
            <div className='row' style={{ maxWidth: "fit-content", margin: "auto" }}><h1 style={{ color: "#364F6B" }}>Organize yourself and your work.</h1></div>
            <div className='row' style={{ maxWidth: "fit-content", margin: "auto" }}><h3 style={{ color: "#364F6B" }}>Stay focused and relaxed with, </h3></div>
            <div className='logo-text mt-5 px-3' style={{ borderRadius: 15, backgroundColor: "#F9ED69", maxWidth: "fit-content", fontSize: 75, margin: "auto" }}>
                TASKER
            </div>
            <br></br>
            <h5 style={{ color: "#364F6B" }}>Head over to TASKS from navbar :) </h5>
        </div>
    )
}

export default Home