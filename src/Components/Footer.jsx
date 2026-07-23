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

              <a href="https://www.aicte.gov.in/office/new-delhi">AICTE New Delhi</a>
              <a href="https://www.rgpv.ac.in/">RGPV Bhopal</a>
              <a href="https://www.rgpvdiploma.in/">RGPV Diploma Bhopal</a>
              <a href="https://bubhopal.ac.in/1068/Home">BU Bhopal</a>
              <a href="https://dte.mponline.gov.in/portal/services/onlinecounselling/counshomepage/home.aspx">DTE MP Counselling</a>
              <a href="https://www.afrcmp.org/">Fee Committee Bhopal</a>
              <a href="#">Vyapam Bhopal</a>
              <a href="https://mponline.gov.in/portal/">MP Online</a>
              <a href="https://antiragging.in/">Anti Ragging Cell</a>
            </div>

            <div className="footer-column">
              <h3>Quick Links</h3>

              <a href="/about">About Us</a>
              <a href="/hospital">Hospital</a>
              <a href="">Admission</a>
              <a href="">Placements</a>
              <a href="">Gallery</a>
              <a href="/contact">Contact</a>
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
              <br />
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

            <div className="footer-column footer-map-column">
              <h3>Find Us</h3>
              <div className="footer-map-wrap">
                <div className="footer-map-label">SAM College Of Ayurvedic Sciences And Hospital</div>
                <iframe
                  className="footer-map"
                  title="SAM College Of Ayurvedic Sciences And Hospital - Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28765.65289354645!2d77.57879375904182!3d23.274084352110805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c3fc1a5940f49%3A0x5ccf5fb1fa2bf8e2!2sSAM%20College%20Of%20Ayurvedic%20Sciences%20And%20Hospital!5e1!3m2!1sen!2sin!4v1784802437135!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                ></iframe>
                <a
                  className="footer-map-link"
                  href="https://www.google.com/maps/place/SAM+College+Of+Ayurvedic+Sciences+And+Hospital/@23.274084352110805,77.57879375904182,15z/data=!4m5!3m4!1s0x397c3fc1a5940f49:0x5ccf5fb1fa2bf8e2!8m2!3d23.274084352110805!4d77.57879375904182"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open SAM College Of Ayurvedic Sciences And Hospital location in Google Maps"
                ></a>
              </div>
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
