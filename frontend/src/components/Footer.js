import React from 'react'
import './Footer.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Footer = () => {
  return (
    <div className='footer ' >
      <p className='mb-0'>&copy;  {new Date().getFullYear()} <a href='https://github.com/manavgondalia/' className='animate-text' style={{ color: "inherit", textDecoration: "none" }}> Manav P Gondalia </a></p>
    </div >
  )
}

export default Footer
