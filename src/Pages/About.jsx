import React, { useEffect, useState } from "react";
import "./About.css";
import { fetchSingle } from "../lib/cms";

// Shown until the CMS responds, and kept as a safety net if the CMS
// is unreachable.
const FALLBACK_ABOUT = {
  title: "SAM College Of Ayurvedic Sciences & Hospital",
  recognition_text:
    "Recognized by Dept. of Ayush, Govt of India and C.C.I.M. New Delhi. Affiliated by MP Medical Science University Jabalpur (up to Batch 2019-20) and SAM Global University from Batch 2020-2021 onwards.",
  about_text:
    "SAM College Of Ayurvedic Sciences and Hospital is an institute of a class of its own, established under the aegis of Shri Guru Hargovind Society, Bhopal in the year 2015, dedicated to reviving the legacy of a great tradition of Ayurveda. The College is recognized by the Central Council of Indian Medicine, Ministry of AYUSH, Govt. of India, New Delhi, and is affiliated to Madhya Pradesh Medical Science University, Jabalpur (MPMSU). Ayurveda, which literally means the science of life (Ayur = Life, Veda = Science), is an ancient medical science developed in India thousands of years ago, evolved from ancient treatises including the Atharva Veda. The ancient Vedic literature laid out instructions to maintain health and fight illness through therapies, massages, herbal medicines, diet control and exercise. SAM College Of Ayurvedic Sciences and Hospital is a fully residential institute functioning on the concept of the ancient Indian Gurukula system of imparting knowledge, where each student is guided by a dedicated Guru throughout the study period, with training that is realistic, practice-oriented and guided by the best faculty available.",
  group_heading: "About SAM",
  group_text:
    "SAM Group Of Institutions is a leading group of central India providing world-class infrastructure and excellence in education. Our founder Chairman Late Shri I.S. Saluja deserves the due homage of immortals. He founded the SAM Educational Society over four and a half decades ago with a vision to offer quality based education to students of all backgrounds.",
  institutions: [
    "SAM College Of Ayurvedic Sciences & Hospital",
    "SAM College Of Engineering & Technology (BE, M.Tech, MCA, MBA & Diploma in ME & CE)",
    "SAM College Of Management & Technology (MBA)",
    "SAM College (BBA, BCA, B.Com, B.Com(Hons.), B.Com(Comp. Application))",
    "SAM College Of Education (B.Ed & D.Ed)",
    "SAM Nursing College (BA, B.Com, B.Sc, M.Sc, M.Com & Ph.D)",
    "SAM Computer Academy (PGDCA)",
    "SAM Higher Secondary School",
  ],
  vision_text:
    "To become a Global Center of Excellence in Ayurveda Medical Education and Healthcare. Dedicate all efforts towards achieving an Ayurvedic renaissance, by way of careful analysis of present-day healthcare needs; systematic planning of resources and infrastructure; sincere, focused and concerted action in implementing the stated objectives; and above all, by the goodwill and guidance of renowned traditional practitioners and doyens of Ayurveda.",
  mission_text:
    "The mission of SAM College of Ayurvedic Sciences and Hospital is defined by its commitment to encourage efficiency and high professional standards in Teaching, Quality Healthcare & Research. Revive Ayurveda for modern-day healthcare, making it relevant to the present as well as future generations, and more accessible to the common man, by way of promoting value-based education and treatment practices with respect to the eight principal components (Ashtanga) of Ayurveda.",
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
          {about.recognition_text && (
            <p className="about-recognition">{about.recognition_text}</p>
          )}
        </div>
      </div>

      <div className="content">
        {about.group_heading && <h2>{about.group_heading}</h2>}
        <p>{about.group_text}</p>
        <p>{about.about_text}</p>

        {about.institutions && about.institutions.length > 0 && (
          <div className="about-institutions">
            <h3>Institutions under Flagship of SAM Group</h3>
            <ul>
              {about.institutions.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}
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
