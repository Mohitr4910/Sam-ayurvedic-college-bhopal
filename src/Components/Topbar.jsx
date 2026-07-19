import React from 'react'
import "./Topbar.css";
import logo from "../assets/Samayurveda (2).png";
import {
    FaPhoneAlt,
    FaEnvelope,
    FaSearch,
} from "react-icons/fa";

import Announcrment from './Announcrment'
import AnimatedContent from './AnimatedContent';

import { NavLink } from "react-router-dom";


import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";



import { useEffect} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

// CMS API base URL - set VITE_API_URL in .env to override (e.g. http://localhost/sam-ayurveda-cms-php for local PHP dev)
const API_BASE = import.meta.env.VITE_API_URL || "https://cms.samayurveda.in";

function Topbar() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");



const [showUploadPopup, setShowUploadPopup] = useState(false);

const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
  localStorage.getItem("adminEmail") !== null
);

  const [disclosures, setDisclosures] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/index.php?type=mandatory_disclosure`)
      .then((res) => setDisclosures(Array.isArray(res.data) ? res.data : []))
      .catch((err) => {
        console.error("Failed to load Mandatory Disclosure list:", err);
        setDisclosures([]);
      });
  }, []);

    const [menuOpen, setMenuOpen] = useState(false);



    return (
        <>
            {/* Blue Header */}

            <div className="top-header">

                <div className="container">

                    <div className="left">

                        <span>
                            <FaPhoneAlt />
                            (+91) 70247 70000
                        </span>

                        <span>
                            <FaEnvelope />
                            care@samayurveda.in
                        </span>

                    </div>

                    <div className="right">

                        <a href="#">ADMISSION</a>
                        <a href="#">PLACEMENTS</a>
                        <a href="#">GALLERY</a>
                        <a href="#">CONTACT</a>

                    </div>

                </div>

            </div>

            <Announcrment />
            {/* White Header */}

<div className="middle-header">
  <div className="container">

    <AnimatedContent
      direction="horizontal"
      reverse
      distance={400}
      duration={2}
      ease="power4.out"
    >
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
    </AnimatedContent>

    {/* Hamburger Button */}
    <div
      className="menu-btn"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </div>

    {/* Single Navbar */}
    <AnimatedContent
      direction="horizontal"
      distance={400}
      duration={2}
      ease="power4.out"
    >
      <nav className={`navbar ${menuOpen ? "active" : ""}`}>
        <ul>
          <li><NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink></li>
          <li><NavLink to="/department" onClick={() => setMenuOpen(false)}>Department</NavLink></li>
          <li><NavLink to="/courses" onClick={() => setMenuOpen(false)}>Courses</NavLink></li>
          <li><NavLink to="/hospital" onClick={() => setMenuOpen(false)}>Hospital</NavLink></li>
          <li><NavLink to="/facilities" onClick={() => setMenuOpen(false)}>Facilities</NavLink></li>
          <li><NavLink to="/academic" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
         {disclosures.length > -1 && (
         <li className="dropdown">
  <span className="dropdown-title">
    Mandatory Disclosure ▼
  </span>

  <ul className="dropdown-menu">
  {disclosures.map((doc) => (
    <li key={doc.id}>
      <a href={doc.file} target="_blank" rel="noopener noreferrer">
        {doc.title}
      </a>
    </li>
  ))}
</ul>
</li>
         )}
        </ul>
      </nav>
    </AnimatedContent>

  </div>
</div>
        </>

    )
}

export default Topbar