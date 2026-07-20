import React, { useEffect, useState } from "react";
import "./Footer.css";
import { fetchSingle } from "../lib/cms";

// Fallback contact details - shown until the CMS responds, and kept as
// a safety net if the CMS is unreachable.
const FALLBACK_CONTACT = {
  address:
    "Village Agariya Chopra,\nBlock-Sanchi, Dis-Raisen\nPincode=-464551\nMadhya Pradesh",
  phone: "(+91) 80851-40009",
  phone2: "(+91) 07067-220000",
  email: "adm.samcet@gmail.com",
  facebook_url: "",
  instagram_url: "",
  youtube_url: "",
};

function Footer() {
  const [contact, setContact] = useState(FALLBACK_CONTACT);

  useEffect(() => {
    let isMounted = true;
    fetchSingle("contact").then((data) => {
      if (isMounted && data) {
        setContact({ ...FALLBACK_CONTACT, ...data });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="footer-overlay">
          <div className="footer-container">
            <div className="footer-column">
              <h3>Important Links</h3>

              <a href="#">AICTE New Delhi</a>
              <a href="#">RGPV Bhopal</a>
              <a href="#">RGPV Diploma Bhopal</a>
              <a href="#">BU Bhopal</a>
              <a href="#">DTE MP Counselling</a>
              <a href="#">Fee Committee Bhopal</a>
              <a href="#">Vyapam Bhopal</a>
              <a href="#">MP Online</a>
              <a href="#">Anti Ragging Cell</a>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>

              <a href="/about">About Us</a>
              <a href="/hospital">Hospital</a>
              <a href="/admission">Admission</a>
              <a href="/placements">Placements</a>
              <a href="/gallery">Gallery</a>
              <a href="/academic">Contact</a>
            </div>

            <div className="footer-column">
              <h3>Connect Us</h3>

              <h4>Corporate Address</h4>

              <p>
                {contact.address.split("\n").map((line, i, arr) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < arr.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>

              <h4>Phone & Email</h4>

              <p>{contact.phone}</p>
              <p>{contact.phone2}</p>

              <a href={`mailto:${contact.email}`}>{contact.email}</a>

              {(contact.facebook_url || contact.instagram_url || contact.youtube_url) && (
                <div className="footer-social">
                  {contact.facebook_url && (
                    <a href={contact.facebook_url} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  )}
                  {contact.instagram_url && (
                    <a href={contact.instagram_url} target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  )}
                  {contact.youtube_url && (
                    <a href={contact.youtube_url} target="_blank" rel="noopener noreferrer">
                      YouTube
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} SAM Global University. All Rights Reserved
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
