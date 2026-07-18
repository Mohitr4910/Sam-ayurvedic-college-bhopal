import React, { useState } from "react";
import {
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Leaf,
  Droplets,
  Microscope,
  FlaskConical,
  BookOpen,
  BedDouble,
  Dumbbell,
  Bus,
  ArrowRight,
  MapPin,
} from "lucide-react";
import AnimatedContent from "../Components/AnimatedContent";

const COLORS = {
  navy: "#0F3557",
  navyDeep: "#0A2540",
  blue: "#1D74A8",
  blueSoft: "#E7F1F8",
  orange: "#E2691B",
  orangeSoft: "#FCEBDD",
  orangeDeep: "#B84E10",
  cream: "#FBFAF7",
  ink: "#132635",
  slate: "#5A6B78",
  line: "#E4E1D8",
};

const NAV = [
  { label: "Home" },
  { label: "About", drop: ["About SAM Ayurveda", "Vision & Mission", "Principal's Message"] },
  { label: "Department" },
  { label: "Courses" },
  { label: "Hospital" },
  { label: "Facilities", active: true },
  { label: "Admission" },
  { label: "Placements" },
  { label: "Gallery" },
  { label: "Contact" },
];

const FACILITIES = [
  {
    icon: Leaf,
    title: "Herbal Garden",
    text: "An on-campus Dravyaguna garden with over 150 catalogued medicinal species used for practical identification.",
  },
  {
    icon: Droplets,
    title: "Panchakarma Theatre",
    text: "Dedicated therapy suites equipped for Vamana, Virechana, Basti, Nasya and allied procedures.",
  },
  {
    icon: Microscope,
    title: "Anatomy & Physiology Labs",
    text: "Dissection hall and instrumentation labs supporting Rachana and Kriya Sharir practicals.",
  },
  {
    icon: FlaskConical,
    title: "Pharmacy (GMP)",
    text: "In-house Rasashastra & Bhaishajya Kalpana unit for classical medicine preparation and dispensing.",
  },
  {
    icon: BookOpen,
    title: "Library & Reading Room",
    text: "Classical Samhita texts, journals and digital resources for students and faculty.",
  },
  {
    icon: BedDouble,
    title: "Hostel",
    text: "Separate residential blocks for men and women with warden supervision and mess facility.",
  },
  {
    icon: Dumbbell,
    title: "Sports & Yoga Ground",
    text: "Open grounds and a dedicated yoga hall for daily practice and inter-college sport.",
  },
  {
    icon: Bus,
    title: "Transport",
    text: "Bus routes connecting campus to Raisen, Bhopal and nearby townships.",
  },
];

function TridoshaMark({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="22" r="15" fill={COLORS.navy} opacity="0.92" />
      <circle cx="38" cy="22" r="15" fill={COLORS.blue} opacity="0.85" />
      <circle cx="31" cy="36" r="15" fill={COLORS.orange} opacity="0.9" />
    </svg>
  );
}

export default function FacilitiesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", color: COLORS.ink, background: COLORS.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Topbar */}
      

      {/* Header / Nav */}
    
      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 50, padding: 20, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer" }}>
              <X size={26} color={COLORS.navy} />
            </button>
          </div>
          <ul style={{ listStyle: "none", padding: 0, marginTop: 12 }}>
            {NAV.map((item) => (
              <li key={item.label} style={{ borderBottom: `1px solid ${COLORS.line}` }}>
                <a href="#" style={{ display: "block", padding: "14px 4px", fontSize: 16, color: item.active ? COLORS.orange : COLORS.navy, textDecoration: "none", fontWeight: 500 }}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Hero */}
      <section style={{ background: `linear-gradient(180deg, ${COLORS.blueSoft} 0%, ${COLORS.cream} 100%)`, borderBottom: `1px solid ${COLORS.line}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -40, top: -30, opacity: 0.12 }}>
          <TridoshaMark size={220} />
        </div>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 20px 64px", position: "relative" }}>
          <div style={{ display: "inline-block", background: COLORS.orangeSoft, color: COLORS.orangeDeep, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, marginBottom: 16 }}>
            Campus infrastructure
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 600, color: COLORS.navy, margin: "0 0 14px", maxWidth: 640 }}>
            Facilities
          </h1>
          <p style={{ fontSize: 16.5, color: COLORS.slate, maxWidth: 560, lineHeight: 1.6, margin: 0 }}>
            What supports the BAMS curriculum outside the lecture hall — labs, garden, pharmacy, hostel and grounds.
          </p>
        </div>
      </section>

      {/* Facilities grid */}
      <section style={{ padding: "56px 20px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {FACILITIES.map(({ icon: Icon, title, text }, i) => (
            
            <AnimatedContent direction="vertical"   distance={200} duration={2} ease="power4.out">

            
            <div
              key={title}
              style={{
                border: `1px solid ${COLORS.line}`,
                borderRadius: 12,
                padding: 24,
                background: "#fff",
                borderTop: `3px solid ${i % 2 === 0 ? COLORS.navy : COLORS.orange}`,
              }}
              >

              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: i % 2 === 0 ? COLORS.blueSoft : COLORS.orangeSoft,
                  color: i % 2 === 0 ? COLORS.navy : COLORS.orangeDeep,
                  marginBottom: 16,
                }}
                >
                <Icon size={22} strokeWidth={1.7} />
              </div>
              <h4 style={{ fontFamily: "'Fraunces', serif", fontSize: 17.5, fontWeight: 600, color: COLORS.navy, margin: "0 0 8px" }}>
                {title}
              </h4>
              <p style={{ fontSize: 14.5, color: COLORS.slate, lineHeight: 1.6, margin: 0 }}>{text}</p>
            </div>
                </AnimatedContent>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section style={{ padding: "0 20px 56px" }}>
        <AnimatedContent direction="vertical"   distance={200} duration={2} ease="power4.out">
        <div
          style={{
            maxWidth: 1180,
            margin: "0 auto",
            background: COLORS.navy,
            borderRadius: 16,
            padding: "36px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 20,
          }}
        >



          <div>
            <h3 style={{ fontFamily: "'Fraunces', serif", color: "#fff", fontSize: 22, margin: "0 0 6px" }}>
              Planning a campus visit?
            </h3>
            <p style={{ color: "#B9CBDA", fontSize: 14.5, margin: 0, maxWidth: 460 }}>
              Prospective students and parents are welcome to tour the hospital, garden and hostel by appointment.
            </p>
          </div>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.orange,
              color: "#fff",
              padding: "12px 22px",
              borderRadius: 8,
              fontSize: 14.5,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            >
            Plan a Visit <ArrowRight size={16} />
          </a>
        </div>
            </AnimatedContent>
      </section>

    </div>
  );
}