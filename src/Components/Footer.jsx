import React from 'react'
import "./Footer.css";
function Footer() {
  return (
    <>
     <footer
      className="footer"
    >
      <div className="footer-overlay">

        <div className="footer-container">

          <div className="footer-column">
            <h3>Important Links</h3>

            <a href="#">AICTE New Delhi</a>
            <a href="#">NCISM</a>
            <a href="#">MP Online</a>
            <a href="#">Fee Committee Bhopal</a>
            <a href="#">Anti Ragging Cell</a>
            <a href="#">SAM Global University</a>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>

            <a href="#">About Us</a>
            <a href="#">Hospital</a>
            <a href="#">Admission</a>
            <a href="#">Placements</a>
            <a href="#">Gallery</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-column">
            <h3>Connect Us</h3>

            <h4>Corporate Address</h4>

            <p>
             Sam Global University
              <br />
           Private university in central India,
              <br />
               Gram Adampur Chawni,
              Raisen Rd, Kolua Khurd, Bhopal,Madhya Pradesh

              <br />
              PIN - 462022
            </p>

            <h4>Phone & Email</h4>

            <p>(+91) 70247 70000</p>

            <a href="mailto:care@samayurveda.in">
              care@samayurveda.in
            </a>

          </div>

        </div>

        <div className="footer-bottom">
          © 2019 SAM Global University. All Rights Reserved
        </div>

      </div>
    </footer>
    
    
    </>
  )
}

export default Footer