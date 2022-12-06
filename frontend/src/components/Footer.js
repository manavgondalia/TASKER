import React from 'react'
import './Footer.css'


const Footer = () => {
  return (
    <div className='footer' >
      <p style={{ display: "inline" }}>Copyright © 2022  </p>
      <p style={{ display: "inline", fontSize: "3vh" }}> | </p>
      <a href='https://github.com/manavgondalia' style={{ color: "inherit", textDecoration: "none" }}><p className='animate-text' style={{ fontSize: "3vh" }}>Manav P Gondalia</p></a>
    </div >
  )
}

export default Footer