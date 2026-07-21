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
  { id: 1, title: "Academic Planner", file: ["hii"] },
  { id: 2, title: "College Council", file: ["hii"] },
  { id: 3, title: "Diagnostic Facility in Hospital", file: ["hii"] },
  { id: 4, title: "Fee", file: ["hii"] },
  { id: 5, title: "Admitted Student List", file: ["hii"] },
  { id: 6, title: "Attendance (Student and Staff)", file: ["hii"] },
  { id: 7, title: "Research and Publication", file: ["hii"] },

  { id: 8, title: "Teaching Staff", file: "/docs/Teaching 2026 april_merged (1).pdf" },

  { id: 9, title: "Non Teaching", file: "/docs/NON Teaching till june 2026.pdf" },

  { id: 10, title: "Hospital Staff", file: "/docs/Hospital 2026 June.pdf" },

  { id: 11, title: "University Related Detail", file: ["hii"] },
  { id: 12, title: "CME, FDP, Conference", file: ["hii"] },
  { id: 13, title: "Award and Achievements", file: ["hii"] },
  { id: 14, title: "Hospital OPD & IPD Patient Related Details", file: ["hii"] },
  { id: 15, title: "Student Activity", file: ["hii"] },
  { id: 16, title: "Student Result", file: ["hii"] },
  { id: 17, title: "Important Link", file: ["hii"] },
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
    const [disclosureOpen, setDisclosureOpen] = useState(false);



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
                      <a href="">GROUP</a>                    
                      <a href="">ENGINEERING</a>                    
                      <a href="">MANAGEMENT</a>                    
                      <a href="">NURSING</a>                    
                      <a href="">AYURVEDA</a>                    
                      <a href="">PHARMACY</a>                    
                      <a href="">EDUCATION</a>                    
                      <a href="">GIRLS COLLEGE</a>                    
                      <a href="">CO-ED COLLEGE</a>                    

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
      onClick={() => {
        setMenuOpen(!menuOpen);
        setDisclosureOpen(false);
      }}
    >
      {menuOpen ? <FaTimes /> : <FaBars />}
    </div>

    {/* Single Navbar */}
    <AnimatedContent
      direction="horizontal"
      distance={400}
      duration={2}
      ease="power4.out"
      className="nav-animate-wrap"
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
         <li className={`dropdown ${disclosureOpen ? "open" : ""}`}>
  <span
    className="dropdown-title"
    onClick={() => setDisclosureOpen(!disclosureOpen)}
  >
    Mandatory Disclosure ▼
  </span>

  <ul className="dropdown-menu">
  {disclosures.map((doc) => (
    <li key={doc.id}>
      <a
        href={doc.file}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          setDisclosureOpen(false);
          setMenuOpen(false);
        }}
      >
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