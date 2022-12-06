import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import Tasks from "./components/Tasks/Tasks";
import './App.css'

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/tasks" element={<Tasks />} exact />
        </Routes>
        <footer>
          <Footer />
        </footer>
      </main>
    </React.Fragment>
  );
}

export default App;
