import React from 'react'
import "./Announcrment.css";
function Announcrment() {

    const notices = [
    "Admissions Open • BAMS 2026-27",
    "AYUSH & NCISM Approved",
    "Expert Faculty",
    "Modern Campus",
    "Clinical Training",
    "Panchakarma",
    "Quality Education",
    "Holistic Healthcare",
    "Research & Innovation",
    "SAM Global University",
    "Apply Now",
    "Natural Healing",
    "Ayurveda for Better Future"
  ];

  return (
    <>
    <div className="announcement-bar">

      <div className="announcement-track">

        {[...notices, ...notices].map((item, index)=>(
          <div className="announcement-item" key={index}>
            <span className="gold-dot"></span>
            {item}
          </div>
        ))}

      </div>

    </div>
    </>
  )
}

export default Announcrment