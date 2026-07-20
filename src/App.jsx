import React from 'react'
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import Department from "./Pages/Department";
import Hospital from "./Pages/Hospital";
import Facilities from "./Pages/Facilities";
import { Routes, Route } from 'react-router-dom'
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/department" element={<Department />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/Facilities" element={<Facilities />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App