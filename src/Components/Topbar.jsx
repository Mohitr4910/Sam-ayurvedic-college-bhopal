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


function Topbar() {
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
                    <AnimatedContent direction="horizontal" reverse distance={400} duration={2} ease="power4.out">

                        <div className="logo">
                            <img src={logo} alt="" />

                        </div>
                    </AnimatedContent>
                    <AnimatedContent direction="horizontal" distance={400} duration={2} ease="power4.out">


                        <nav className="navbar">
                            <div className="container">
                                <ul>

                                    <li>
                                        <NavLink to="/">Home</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/about">About</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/academic">Academics</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/department">Department</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/courses">Courses</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/hospital">Hospital</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/facilities">Facilities</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/mandatory-disclosure">
                                            Mandatory Disclosure
                                        </NavLink>
                                    </li>

                                </ul>
                            </div>
                        </nav>
                    </AnimatedContent>

                    {/* <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search..."
            />

          </div> */}

                </div>

            </div>
        </>

    )
}

export default Topbar