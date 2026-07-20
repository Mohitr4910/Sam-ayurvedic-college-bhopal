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

  // STATIC (temporary) list of Mandatory Disclosure documents.
  // Add each new PDF here: put the file in `public/docs/` and add
  // a row below with a title + the path to that file.
  const staticDisclosures = [
    { id: 1, title: "Batch 2022-23", file: "/docs/2022-23.pdf" },
    { id: 2, title: "Batch 2023-24", file: "/docs/2023-24.pdf" },
    { id: 3, title: "Batch 2024-25", file: "/docs/2024-25.pdf" },
    { id: 4, title: "Batch 2025-26", file: "/docs/2025-26.pdf" },
    { id: 5, title: "Hospital 2026 June", file: "/docs/Hospital 2026 June.pdf" },
    { id: 6, title: "Teaching 2026 april_merged", file: "/docs/Teaching 2026 april_merged (1).pdf" },
    { id: 7, title: "NON Teaching till june 2026", file: "/docs/NON Teaching till june 2026.pdf" },
  ];

  const [disclosures, setDisclosures] = useState(staticDisclosures);

  // --- CMS API version (commented out for now, switch back later) ---
  // useEffect(() => {
  //   axios
  //     .get(`${API_BASE}/api/index.php?type=mandatory_disclosure`)
  //     .then((res) => setDisclosures(Array.isArray(res.data) ? res.data : []))
  //     .catch((err) => {
  //       console.error("Failed to load Mandatory Disclosure list:", err);
  //       setDisclosures([]);
  //     });
  // }, []);

    const [menuOpen, setMenuOpen] = useState(false);



    return (
        <>
            {/* Blue Header */}

            <div className="top-header">

                <div className="container">

                    <div className="left">

                        <span>
                            <FaPhoneAlt />
                           (+91) 80851-40009
                        </span>

                        <span>
                            <FaEnvelope />
                           adm.samcet@gmail.com
                        </span>

                    </div>

                    <div className="right">

                        {/* <a href="#">ADMISSION</a>
                        <a href="#">PLACEMENTS</a>
                        <a href="#">GALLERY</a> */}
                       <NavLink to="">ADMISSION</NavLink>
                       <NavLink to="">PLACEMENTS</NavLink>
                       <NavLink to="">GALLERY</NavLink>
                       <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>


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
          <li><NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink></li>
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