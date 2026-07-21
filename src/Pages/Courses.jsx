import React, { useEffect, useState } from "react";
import AnimatedContent from "../Components/AnimatedContent";
import { fetchList } from "../lib/cms";

const NAV_ITEMS = [
  { label: "Home", href: "index.html" },
  {
    label: "About",
    href: "#",
    dropdown: [
      { label: "About SAM Ayurveda", href: "about.html" },
      { label: "Vision & Mission", href: "vision-mission.html" },
      { label: "Principal's Message", href: "principals-message.html" },
    ],
  },
  { label: "Department", href: "department.html" },
  { label: "Courses", href: "courses.html", active: true },
  { label: "Hospital", href: "hospital.html" },
  { label: "Facilities", href: "facilities.html" },
  { label: "Admission", href: "admission.html" },
  { label: "Placements", href: "placements.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "Contact", href: "contact.html" },
];

const FALLBACK_STATS = [
  { num: "5.5 yrs", lbl: "Duration incl. internship", tone: "green" },
  { num: "4", lbl: "Professional years", tone: "blue" },
  { num: "NEET", lbl: "Entrance requirement", tone: "orange" },
  { num: "NCISM", lbl: "Regulatory body", tone: "green" },
];

const FALLBACK_COURSE = {
  name: "BAMS",
  duration: "5.5 yrs",
  eligibility: "",
  description:
    "The Bachelor of Ayurvedic Medicine and Surgery (BAMS) is an undergraduate degree recognised by the National Commission for Indian System of Medicine (NCISM) and the Department of AYUSH. It combines the study of classical Samhita texts with modern basic sciences — anatomy, physiology, pathology and pharmacology — before moving into clinical postings across all fourteen departments.",
  brochure: "",
};

const ELIGIBILITY = [
  { req: "Qualifying exam", criteria: "10+2 with Physics, Chemistry, Biology (PCB)" },
  { req: "Entrance test", criteria: "Valid NEET (UG) score" },
  { req: "Minimum marks", criteria: "As prescribed by NCISM / state counselling authority" },
  { req: "Age", criteria: "As prescribed under current NCISM admission regulations" },
];

const TIMELINE = [
  {
    title: "First Professional",
    desc: "Samhita Siddhanta – I, Sanskrit & Ithihas – I, Padarth Vigyan & Ayurved Itihas – I, Kriya Sharir (Physiology) – I, Rachana Sharir (Anatomy) – I.",
    tone: "green",
  },
  {
    title: "Second Professional",
    desc: "Agad Tantra – II, Swasthavritta – II, Samhita & Siddhanta – II, Roga Nidan – II, Rasashastra & Bhaishajya Kalpana – II, Dravyaguna Vigyan – II.",
    tone: "blue",
  },
  {
    title: "Third Professional",
    desc: "Kaya Chikitsa – III, Prasuti Tantra & Stri Roga – III, Shalya Tantra – III, Shalakya Tantra – III.",
    tone: "orange",
  },
  {
    title: "Fourth Professional & Internship",
    desc: "Kaya Chikitsa – IV (advanced), Panchakarma, Compulsory Rotatory Internship (12 months).",
    tone: "green",
  },
];

// function TridoshaMark({ className = "" }) {
//   return (
//     <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
//       <circle className="c-vata" cx="24" cy="22" r="15" />
//       <circle className="c-pitta" cx="38" cy="22" r="15" />
//       <circle className="c-kapha" cx="31" cy="36" r="15" />
//     </svg>
//   );
// }

/* Decorative botanical corner motif for the hero — stands in for a photo
   without borrowing imagery tied to another institution or brand. */
// function LeafMotif({ className = "" }) {
//   return (
//     <svg className={className} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <g fill="none" strokeWidth="2.5" strokeLinecap="round">
//         <path d="M110 200 C 60 160, 40 100, 70 40 C 100 90, 100 150, 110 200 Z" fill="var(--green)" opacity="0.9" />
//         <path d="M110 200 C 150 165, 175 110, 150 45 C 120 95, 115 155, 110 200 Z" fill="var(--blue)" opacity="0.85" />
//         <path d="M110 200 C 130 150, 150 120, 195 105 C 175 145, 150 175, 110 200 Z" fill="var(--orange)" opacity="0.9" />
//         <path d="M110 30 L110 200" stroke="#fff" strokeOpacity="0.5" />
//       </g>
//       <circle cx="110" cy="200" r="7" fill="var(--green-deep)" />
//     </svg>
//   );
// }

/* Small mortar & pestle icon, referencing classical Ayurvedic preparation
   (Bhaishajya Kalpana) — used as an illustrative anchor in the sidebar. */
// function MortarPestleIcon({ className = "" }) {
//   return (
//     <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//       <path d="M14 34 C14 48, 24 56, 32 56 C40 56, 50 48, 50 34" fill="none" stroke="var(--orange)" strokeWidth="4" strokeLinecap="round" />
//       <ellipse cx="32" cy="34" rx="20" ry="6" fill="var(--orange-soft)" stroke="var(--orange)" strokeWidth="2.5" />
//       <rect x="36" y="8" width="6" height="26" rx="3" transform="rotate(18 39 21)" fill="var(--blue)" />
//       <circle cx="24" cy="30" r="2.4" fill="var(--green)" />
//       <circle cx="32" cy="27" r="2.4" fill="var(--green)" />
//       <circle cx="40" cy="30" r="2.4" fill="var(--green)" />
//     </svg>
//   );
// }

function PrimaryNav() {
  return (
    <ul>
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className={item.dropdown ? "has-drop" : item.active ? "active" : ""}>
          <a href={item.href}>{item.label}</a>
          {item.dropdown && (
            <ul className="dropdown">
              {item.dropdown.map((sub) => (
                <li key={sub.label}>
                  <a href={sub.href}>{sub.label}</a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function CoursesPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [course, setCourse] = useState(FALLBACK_COURSE);

  useEffect(() => {
    let isMounted = true;
    fetchList("course").then((rows) => {
      if (!isMounted || rows.length === 0) return;
      // BAMS is the flagship (and currently only) course - prefer an
      // entry named after it, otherwise fall back to the first course
      // entered in the CMS.
      const bams = rows.find((r) => /bams/i.test(r.name || "")) || rows[0];
      setCourse({ ...FALLBACK_COURSE, ...bams });
      if (bams.duration) {
        setStats((prev) => {
          const next = [...prev];
          next[0] = { ...next[0], num: bams.duration };
          return next;
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="sam-site">
      <style>{`
        .sam-site {
          --green-deep: #1f4d3a;
          --green: #2f7a55;
          --green-soft: #e7f2ec;
          --blue: #2c6cad;
          --blue-soft: #eaf1f9;
          --orange: #e0762f;
          --orange-soft: #fdf0e4;
          --cream: #faf8f3;
          --ink: #1c2420;
          --muted: #5b675f;
          --line: #dfe7e1;
          --vata: #6fae8c;
          --pitta: #d98a3d;
          --kapha: #3d7cd9;
          --display: 'Poppins', 'Segoe UI', sans-serif;
          --body: 'Inter', 'Segoe UI', sans-serif;
          font-family: var(--body);
          color: var(--ink);
          background: var(--cream);
        }
        .sam-site * { box-sizing: border-box; }
        .sam-site a { text-decoration: none; color: inherit; }
        .sam-site .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
        .sam-site .tridosha .c-vata { fill: var(--vata); opacity: .85; }
        .sam-site .tridosha .c-pitta { fill: var(--pitta); opacity: .85; mix-blend-mode: multiply; }
        .sam-site .tridosha .c-kapha { fill: var(--kapha); opacity: .85; mix-blend-mode: multiply; }

        .sam-site .topbar { background: var(--green-deep); color: #fff; font-size: 13px; }
        .sam-site .topbar .container { display: flex; justify-content: space-between; padding: 8px 20px; }
        .sam-site .topbar-left a, .sam-site .topbar-right a { color: #eaf3ee; margin-right: 18px; }
        .sam-site .topbar-right a:last-child, .sam-site .topbar-left a:last-child { margin-right: 0; }

        .sam-site header.site { background: #fff; border-bottom: 1px solid var(--line); position: relative; }
        .sam-site .nav-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; gap: 20px; }
        .sam-site .brand { display: flex; align-items: center; gap: 10px; }
        .sam-site .brand-mark { width: 40px; height: 40px; flex-shrink: 0; }
        .sam-site .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
        .sam-site .brand-text .name { font-family: var(--display); font-weight: 700; font-size: 18px; color: var(--green-deep); }
        .sam-site .brand-text .sub { font-size: 11px; color: var(--muted); }

        .sam-site .primary ul { list-style: none; display: flex; gap: 22px; margin: 0; padding: 0; font-size: 14.5px; font-weight: 500; }
        .sam-site .primary li { position: relative; padding: 6px 0; }
        .sam-site .primary li.active > a, .sam-site .primary li a:hover { color: var(--blue); }
        .sam-site .primary li.has-drop:hover .dropdown { display: block; }
        .sam-site .dropdown { display: none; position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid var(--line); border-radius: 8px; min-width: 210px; padding: 8px; box-shadow: 0 12px 24px rgba(20,40,30,.12); z-index: 20; }
        .sam-site .dropdown li { padding: 0; }
        .sam-site .dropdown li a { display: block; padding: 8px 10px; border-radius: 6px; font-weight: 400; }
        .sam-site .dropdown li a:hover { background: var(--green-soft); }

        .sam-site .nav-cta { background: var(--green); color: #fff; padding: 10px 18px; border-radius: 999px; font-size: 14px; font-weight: 600; white-space: nowrap; transition: background .2s ease; }
        .sam-site .nav-cta:hover { background: var(--orange); }
        .sam-site .nav-toggle { display: none; background: none; border: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; }
        .sam-site .nav-toggle span { width: 22px; height: 2px; background: var(--green-deep); display: block; }

        .sam-site .mobile-nav { position: fixed; inset: 0; background: #fff; z-index: 50; transform: translateX(100%); transition: transform .25s ease; padding: 20px; overflow-y: auto; }
        .sam-site .mobile-nav.open { transform: translateX(0); }
        .sam-site .mobile-nav .close-row { display: flex; justify-content: flex-end; margin-bottom: 10px; }
        .sam-site .mobile-nav ul { list-style: none; padding: 0; margin: 0; font-size: 17px; }
        .sam-site .mobile-nav li { border-bottom: 1px solid var(--line); }
        .sam-site .mobile-nav li a { display: block; padding: 14px 4px; }
        .sam-site .mobile-nav .dropdown { display: block; position: static; border: none; box-shadow: none; padding: 0 0 10px 14px; }

        .sam-site .page-hero { background: linear-gradient(135deg, var(--green-soft) 0%, var(--blue-soft) 55%, #fff 100%); padding: 48px 0 40px; position: relative; overflow: hidden; }
        .sam-site .hero-row { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
        .sam-site .hero-copy { max-width: 640px; }
        .sam-site .hero-art { width: 150px; height: 150px; flex-shrink: 0; opacity: 0.95; }
        .sam-site .crumb { font-size: 13px; color: var(--muted); margin-bottom: 10px; }
        .sam-site .eyebrow { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
        .sam-site .page-hero h1 { font-family: var(--display); font-size: 36px; color: var(--green-deep); margin: 0 0 10px; }
        .sam-site .page-hero p { color: var(--muted); max-width: 640px; margin: 0; }

        .sam-site section { padding: 44px 0; }

        .sam-site .stat-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 26px 10px; }
        .sam-site .stat-strip > div { text-align: center; border-right: 1px solid var(--line); }
        .sam-site .stat-strip > div:last-child { border-right: none; }
        .sam-site .stat-strip .dot { width: 10px; height: 10px; border-radius: 50%; margin: 0 auto 8px; }
        .sam-site .stat-strip .dot.green { background: var(--green); }
        .sam-site .stat-strip .dot.blue { background: var(--blue); }
        .sam-site .stat-strip .dot.orange { background: var(--orange); }
        .sam-site .stat-strip .num { display: block; font-family: var(--display); font-size: 24px; font-weight: 700; color: var(--green-deep); }
        .sam-site .stat-strip .lbl { display: block; font-size: 12.5px; color: var(--muted); margin-top: 4px; }

        .sam-site .content-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 34px; align-items: start; }
        .sam-site .content-grid h2 { font-family: var(--display); color: var(--green-deep); font-size: 25px; margin: 0 0 14px; }
        .sam-site .content-grid h3 { font-family: var(--display); color: var(--green-deep); font-size: 18px; margin: 30px 0 12px; }
        .sam-site .content-grid p { color: var(--muted); line-height: 1.7; font-size: 15px; margin: 0 0 14px; }
        .sam-site .content-grid a { color: var(--blue); font-weight: 600; text-decoration: underline; }

        .sam-site table.plain { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; font-size: 14px; }
        .sam-site table.plain th, .sam-site table.plain td { padding: 12px 14px; text-align: left; border-bottom: 1px solid var(--line); }
        .sam-site table.plain th { background: var(--blue-soft); color: var(--green-deep); font-family: var(--display); font-size: 13px; }
        .sam-site table.plain tr:last-child td { border-bottom: none; }

        .sam-site ol.timeline { list-style: none; margin: 0; padding: 0; counter-reset: step; }
        .sam-site ol.timeline li { position: relative; padding: 0 0 26px 44px; border-left: 2px solid var(--line); margin-left: 12px; }
        .sam-site ol.timeline li:last-child { border-left-color: transparent; padding-bottom: 0; }
        .sam-site ol.timeline li::before { counter-increment: step; content: counter(step); position: absolute; left: -13px; top: 0; width: 26px; height: 26px; border-radius: 50%; color: #fff; font-size: 12.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
        .sam-site ol.timeline li.tone-green::before { background: var(--green); }
        .sam-site ol.timeline li.tone-blue::before { background: var(--blue); }
        .sam-site ol.timeline li.tone-orange::before { background: var(--orange); }
        .sam-site ol.timeline h4 { font-family: var(--display); color: var(--green-deep); font-size: 15.5px; margin: 0 0 6px; }
        .sam-site ol.timeline p { margin: 0; font-size: 14px; color: var(--muted); line-height: 1.6; }

        .sam-site .pull-card { background: var(--green-soft); border-radius: 14px; padding: 20px 22px; border-left: 4px solid var(--green); }
        .sam-site .pull-card h4 { margin: 0 0 8px; font-family: var(--display); color: var(--green-deep); font-size: 15px; }
        .sam-site .pull-card p { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.6; }

        .sam-site .icon-card { display: flex; gap: 14px; align-items: flex-start; background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 18px 20px; margin-bottom: 18px; }
        .sam-site .icon-card svg { width: 46px; height: 46px; flex-shrink: 0; }
        .sam-site .icon-card h4 { margin: 0 0 6px; font-family: var(--display); color: var(--green-deep); font-size: 15px; }
        .sam-site .icon-card p { margin: 0; color: var(--muted); font-size: 13.5px; line-height: 1.6; }

        .sam-site footer.site { background: var(--green-deep); color: #eaf3ee; padding: 48px 0 18px; margin-top: 20px; position: relative; }
        .sam-site footer.site::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--blue), var(--green), var(--orange)); }
        .sam-site .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; }
        .sam-site .footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .sam-site .footer-brand .name { font-family: var(--display); font-weight: 700; font-size: 17px; color: #fff; }
        .sam-site .footer-grid p { font-size: 13.5px; color: #cfe3d8; line-height: 1.6; }
        .sam-site .footer-grid h4 { font-family: var(--display); font-size: 15px; margin: 0 0 12px; color: #fff; }
        .sam-site .footer-grid ul { list-style: none; margin: 0; padding: 0; }
        .sam-site .footer-grid li { margin-bottom: 8px; }
        .sam-site .footer-grid ul a { font-size: 13.5px; color: #cfe3d8; text-decoration: none; }
        .sam-site .footer-grid ul a:hover { color: var(--orange); }
        .sam-site .footer-bottom { border-top: 1px solid rgba(255,255,255,.15); margin-top: 30px; padding-top: 16px; display: flex; justify-content: space-between; font-size: 12.5px; color: #a9c6b8; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 900px) {
          .sam-site .content-grid { grid-template-columns: 1fr; }
          .sam-site .stat-strip { grid-template-columns: 1fr 1fr; }
          .sam-site .stat-strip > div:nth-child(2) { border-right: none; }
          .sam-site .footer-grid { grid-template-columns: 1fr 1fr; }
          .sam-site .hero-art { display: none; }
        }
        @media (max-width: 760px) {
          .sam-site .primary, .sam-site .nav-cta { display: none; }
          .sam-site .nav-toggle { display: flex; }
          .sam-site .footer-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .sam-site .stat-strip { grid-template-columns: 1fr; }
          .sam-site .stat-strip > div { border-right: none; border-bottom: 1px solid var(--line); padding-bottom: 14px; }
          .sam-site .stat-strip > div:last-child { border-bottom: none; }
        }
      `}</style>


      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <div className="close-row">
          <button className="nav-toggle" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <PrimaryNav />
      </div>

      <section className="page-hero">
        <div className="container hero-row">
          <div className="hero-copy">
            <div className="eyebrow">Sam Academic programme</div>
            <h1>BAMS</h1>
            <p>Bachelor of Ayurvedic Medicine and Surgery — a five-and-a-half-year programme combining classical study, basic sciences and supervised clinical practice.</p>
          </div>
          {/* <LeafMotif className="hero-art" /> */}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="stat-strip">
            {stats.map((s) => (
              <div key={s.lbl}>
                <span className={`dot ${s.tone}`} />
                <span className="num">{s.num}</span>
                <span className="lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container content-grid">
          <div>
            <AnimatedContent direction="horizontal" reverse  distance={200} duration={2} ease="power4.out">


            <h2>About the programme</h2>
            <p>{course.description}</p>
            <p>The course is organised into four professional years, followed by a compulsory one-year rotatory internship in the attached teaching hospital.</p>

            </AnimatedContent>
            <AnimatedContent direction="horizontal" reverse  distance={200} duration={3} ease="power4.out">


            <h3>Eligibility</h3>
            <table className="plain">
              <tbody>
                <tr><th>Requirement</th><th>Criteria</th></tr>
                {ELIGIBILITY.map((row) => (
                  <tr key={row.req}>
                    <td>{row.req}</td>
                    <td>{row.criteria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {course.eligibility && <p style={{ marginTop: 14 }}>{course.eligibility}</p>}
                </AnimatedContent>

            <h3>Curriculum, professional-wise</h3>
            <p>Order matters here — each professional year is a prerequisite for the next, so the syllabus is presented as a sequence rather than a menu.</p>
            <ol className="timeline">
              {TIMELINE.map((t, index) => (
                <li key={t.title} className={`tone-${t.tone}`}>
            <AnimatedContent direction="vertical"   distance={200} duration={index+1} ease="power4.out">
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
            </AnimatedContent>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <div className="icon-card">
              {/* <MortarPestleIcon /> */}
              <div>
                <h4>Classical foundation</h4>
                <p>Study of Samhita texts and Bhaishajya Kalpana runs alongside modern basic sciences from year one.</p>
              </div>
            </div>
<AnimatedContent direction="vertical"  distance={200} duration={2} ease="power4.out">


            <div className="pull-card">
              <h4>Documents for reference</h4>
              <p>Time table and subject-wise syllabus PDFs (as prescribed by NCISM) are published on the Academics section for currently enrolled students.</p>
              {course.brochure && (
                <p style={{ marginTop: 10 }}>
                  <a href={course.brochure} target="_blank" rel="noopener noreferrer">Download course brochure (PDF)</a>
                </p>
              )}
            </div>
</AnimatedContent>
            <AnimatedContent direction="vertical"  distance={200} duration={2} ease="power4.out">
  
            <div className="pull-card" style={{ marginTop: 18, borderLeftColor: "var(--blue)" }}>
              <h4>After BAMS</h4>
              <p>Graduates may register as Ayurvedic medical practitioners, pursue MD/MS (Ayurveda) specialisation, or move into hospital, research and pharmaceutical roles — see <a href="placements.html">Placements</a>.</p>
            </div>
</AnimatedContent>
            <AnimatedContent direction="vertical"  distance={200} duration={2} ease="power4.out">
  
            <div className="pull-card" style={{ marginTop: 18, borderLeftColor: "var(--orange)" }}>
              <h4>Ready to apply?</h4>
              <p>Review the full process on the <a>Admission</a> page.</p>
            </div>
</AnimatedContent>
          </div>
        </div>
      </section>

    </div>
  );
}