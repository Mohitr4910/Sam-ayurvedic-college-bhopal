import React from 'react'
import { FaChevronDown } from "react-icons/fa";
import "./Navbar.css";
function Navbar() {
  return (
    <>
    <nav className="navbar">

      <div className="container">

        <ul>

          <li className="active">Home</li>

          <li>
            About
            
          </li>

          <li>
            Academics
          </li>

          <li>Department</li>

          <li>
            Courses
            
          </li>

          <li>Hospital</li>

          <li>Facilities</li>

          <li>
            Mandatory Disclosure
            
          </li>

        </ul>

      </div>

    </nav>
    </>
  )
}

export default Navbar