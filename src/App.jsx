import React from 'react'
import Home from "./Pages/Home";
import About from "./Pages/About";
import Academics from "./Pages/Academics";
import Courses from "./Pages/Courses";
import Department from "./Pages/Department";
import Hospital from "./Pages/Hospital";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academic" element={<Academics />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/department" element={<Department />} />
        <Route path="/hospital" element={<Hospital />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App