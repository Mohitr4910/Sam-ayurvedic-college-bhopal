import React from 'react'
import { Link } from "react-router-dom";
import "./Topbar.css";
import logo from "../assets/Samayurveda (2).png";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaSearch,
  FaChevronDown,
  FaFilePdf,
} from "react-icons/fa";

import Announcrment from './Announcrment'
import AnimatedContent from './AnimatedContent';

import { NavLink } from "react-router-dom";


import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";



import { useEffect } from "react";
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
  // Each entry is a HEADING. Put every PDF that belongs under that
  // heading inside its `files` array as { title, path } — add as
  // many as you need. Put the actual PDF in `public/docs/` and
  // reference it by that path. Leave `files: []` for a heading
  // that doesn't have a PDF uploaded yet (it will show "Coming soon").
  const staticDisclosures = [
    {
      id: 1, title: "Academic Planner", files: [
        { title: "Academic Planner", path: "/docs/academic-planner.pdf" },
      ]
    },
    {
      id: 2, title: "College Council", files: [
        { title: "College Council", path: "/docs/2.college-council.pdf" },
        { title: "College Council", path: "/docs/2.college-council-pdf-724x1024.jpg" },

      ]
    },
    {
      id: 3, title: "Diagnostic Facility in Hospital", files: [
        { title: "Facility", path: "/docs/3.Diagnostic-Facility-in-Hospital-pdf.jpg" },

      ]
    },
    {
      id: 4, title: "Fee", files: [
        { title: "fees_.pdf", path: "/docs/4.fees_.pdf" },

      ]
    },
    {
      id: 5, title: "Admitted Student List", files: [
        { title: "fees_.pd", path: "/docs/5.-list-of-admitted-students.pdf" },

      ]
    },
    {
      id: 6, title: "Attendance (Student and Staff)", files: [
        { title: "Staff Attendance ", path: "/docs/TEACHING-Staff-Attendance.pdf" },
        { title: "Student Attendance batch-2024-25 ", path: "/docs/student-attendance-batch-2024-25.pdf" },
        { title: "Student Attendance batch-2022-23", path: "/docs/student-attendance-batch-2022-23.pdf" },
        { title: "Student Attendance Batch-2021-22  ", path: "/docs/student-attendance-batch-2021-22.pdf" },

      ]
    },
    { id: 7, title: "Research and Publication", files: [] },

    {
      id: 8,
      title: "Teaching Staff",
      files: [
        { title: "Teaching Staff List", path: "/docs/Teaching 2026 april_merged (1).pdf" },
        { title: "Details-of-Teaching-Staff", path: "/docs/8.Details-of-Teaching-Staff.pdf" },
      ],
    },

    {
      id: 9,
      title: "Non Teaching",
      files: [
        { title: "Non Teaching Staff List", path: "/docs/NON Teaching till june 2026.pdf" },
        { title: "Details-of-Non-Teaching-staff", path: "/docs/9.Details-of-Non-Teaching-staff.pdf" },
      ],
    },

    {
      id: 10,
      title: "Hospital Staff",
      files: [
        { title: "Hospital Staff List", path: "/docs/Hospital 2026 June.pdf" },
      ],
    },

    {
      id: 11, title: "University Related Detail", files: [
        { title: "University Related Detail", path: "/docs/11-University-details.pdf" },

      ]
    },
    {
      id: 12, title: "CME, FDP, Conference", files: [
        { title: "12-CME-FDP-Conference-pdf", path: "/docs/12-CME-FDP-Conference-pdf-724x1024.jpg" },

      ]
    },
    {
      id: 13, title: "Award and Achievements", files: [
        { title: "13-Award-Achievements.pdf", path: "/docs/13-Award-Achievements.pdf" },

      ]
    },
    {
      id: 14, title: "Hospital OPD & IPD Patient Related Details", files: [
        { title: "14-Hospital-OPD-IPD-Details.pdf", path: "/docs/14-Hospital-OPD-IPD-Details.pdf" },

      ]
    },
    {
      id: 15, title: "Student Activity", files: [
        { title: "14-Hospital-OPD-IPD-Details.pdf", path: "/docs/15-Student-Activity.pdf" },

      ]
    },
    {
      id: 16, title: "Student Result", files: [
        { title: "16-Student-Results.pdf", path: "/16-Student-Results.pdf" },

      ]
    },
    { id: 17, title: "Important Link", files: [] },
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
  // Which Mandatory Disclosure heading is currently expanded (click, not hover)
  const [openDisclosureId, setOpenDisclosureId] = useState(null);



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
                           <a style={{color:"white", textDecoration:"none"}} href={`mailto:${""}`}>adm.samcet@gmail.com</a>

            </span>

          </div>

          <div className="right">
            <a href="https://www.samglobaluniversity.ac.in/sam-group/">Group</a>
            <a href="https://www.samglobaluniversity.ac.in/faculty-of-engg-technology/">Engineering</a>
            <a href="https://www.samglobaluniversity.ac.in/faculty-of-management/">Management</a>
            <a href="https://samcollegeofnursing.in/">Nursing</a>
            <a href="https://sassam.org/">Ayurveda</a>
            <a href="https://www.samglobaluniversity.ac.in/faculty-of-medical-paramedical-science/b-pharma/">Pharmacy</a>
            <a href="https://www.samglobaluniversity.ac.in/faculty-of-education/">Education</a>
            <a href="https://samgirlscollege.com/">Girls College</a>
            <a href="https://samcollege.in/">Co-Ed College</a>
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
  <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
  <img src={logo} alt="Logo" />
</Link>
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
                      {disclosures.map((doc) => {
                        const isOpen = openDisclosureId === doc.id;
                        const files = Array.isArray(doc.files) ? doc.files : [];
                        return (
                          <li
                            key={doc.id}
                            className={`disclosure-item ${isOpen ? "open" : ""}`}
                          >
                            <button
                              type="button"
                              className="disclosure-heading"
                              aria-expanded={isOpen}
                              onClick={() =>
                                setOpenDisclosureId(isOpen ? null : doc.id)
                              }
                            >
                              <span>{doc.title}</span>
                              <FaChevronDown className="disclosure-arrow" />
                            </button>

                            {isOpen && (
                              <ul className="disclosure-files">
                                {files.length > 0 ? (
                                  files.map((f, idx) => (
                                    <li key={idx}>
                                      <a
                                        href={f.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => {
                                          setDisclosureOpen(false);
                                          setMenuOpen(false);
                                          setOpenDisclosureId(null);
                                        }}
                                      >
                                        <FaFilePdf className="disclosure-file-icon" />
                                        <span>{f.title}</span>
                                      </a>
                                    </li>
                                  ))
                                ) : (
                                  <li className="disclosure-empty">Coming soon</li>
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
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