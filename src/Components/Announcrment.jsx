import React, { useEffect, useState } from "react";
import "./Announcrment.css";
import { fetchList } from "../lib/cms";

// Shown until the CMS responds, and kept as a safety net if the CMS
// is unreachable or has no active announcements yet.
const FALLBACK_NOTICES = [
  { text: "Admissions Open • BAMS 2026-27", link: "" },
  { text: "AYUSH & NCISM Approved", link: "" },
  { text: "Expert Faculty", link: "" },
  { text: "Modern Campus", link: "" },
  { text: "Clinical Training", link: "" },
  { text: "Panchakarma", link: "" },
  { text: "Quality Education", link: "" },
  { text: "Holistic Healthcare", link: "" },
  { text: "Research & Innovation", link: "" },
  { text: "SAM Global University", link: "" },
  { text: "Apply Now", link: "" },
  { text: "Natural Healing", link: "" },
  { text: "Ayurveda for Better Future", link: "" },
];

function Announcrment() {
  const [notices, setNotices] = useState(FALLBACK_NOTICES);

  useEffect(() => {
    let isMounted = true;
    fetchList("announcement").then((rows) => {
      if (isMounted && rows.length > 0) {
        setNotices(rows.map((r) => ({ text: r.text, link: r.link || "" })));
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="announcement-bar">
        <div className="announcement-track">
          {[...notices, ...notices].map((item, index) => (
            <div className="announcement-item" key={index}>
              <span className="gold-dot"></span>
              {item.link ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Announcrment;
