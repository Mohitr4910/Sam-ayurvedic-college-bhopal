import React, { useEffect, useState } from "react";
import "./About.css";
import { fetchSingle } from "../lib/cms";

// Shown until the CMS responds, and kept as a safety net if the CMS
// is unreachable.
const FALLBACK_ABOUT = {
  title: "About SAM Ayurveda",
  about_text:
    "SAM School of Ayurveda Science, a prestigious addition to SAM Global University, is dedicated to advancing the field of Ayurvedic medicine through its Bachelor of Ayurvedic Medicine and Surgery (BAMS) program. Established in 2019 under the Shri Guru Hargobind Society, SAM Global University is recognized as the leading private university in Bhopal, Madhya Pradesh. With a legacy spanning six decades, SGU has consistently set benchmarks in education and remains committed to excellence. The university's recognition under the Madhya Pradesh Niji Vishwavidhyalaya (Sthapana Avam Sanchalan) Adhiniyam 2007 and by the UGC underscores its dedication to maintaining high standards. The SAM School of Ayurveda Science continues this tradition by offering comprehensive training in Ayurveda, preparing students to become proficient practitioners and contributors to the field.",
  vision_text: "",
  mission_text: "",
  goal_text: "",
  principal_name: "",
  principal_message: "",
  principal_photo: "",
};

function About() {
  const [about, setAbout] = useState(FALLBACK_ABOUT);

  useEffect(() => {
    let isMounted = true;
    fetchSingle("about").then((data) => {
      if (isMounted && data) {
        setAbout({ ...FALLBACK_ABOUT, ...data });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const hasVMG = about.vision_text || about.mission_text || about.goal_text;
  const hasPrincipal = about.principal_name || about.principal_message;

  return (
    <>
      <div className="top-bar"></div>

      <div className="hero">
        <div className="hero-content">
          <h1>{about.title}</h1>
          <div className="hero-underline"></div>
        </div>
      </div>

      <div className="content">
        <p>{about.about_text}</p>
      </div>

      {hasVMG && (
        <div className="about-vmg">
          {about.vision_text && (
            <div className="about-vmg-card">
              <h3>Vision</h3>
              <p>{about.vision_text}</p>
            </div>
          )}
          {about.mission_text && (
            <div className="about-vmg-card">
              <h3>Mission</h3>
              <p>{about.mission_text}</p>
            </div>
          )}
          {about.goal_text && (
            <div className="about-vmg-card">
              <h3>Goal</h3>
              <p>{about.goal_text}</p>
            </div>
          )}
        </div>
      )}

      {hasPrincipal && (
        <div className="about-principal">
          {about.principal_photo && (
            <img src={about.principal_photo} alt={about.principal_name} className="about-principal-photo" />
          )}
          <div className="about-principal-text">
            {about.principal_name && <h3>{about.principal_name}</h3>}
            {about.principal_message && <p>{about.principal_message}</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default About;
