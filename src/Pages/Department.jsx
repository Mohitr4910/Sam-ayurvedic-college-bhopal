import React, { useState } from "react";

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
  { label: "Department", href: "department.html", active: true },
  { label: "Courses", href: "courses.html" },
  { label: "Hospital", href: "hospital.html" },
  { label: "Facilities", href: "facilities.html" },
  { label: "Admission", href: "admission.html" },
  { label: "Placements", href: "placements.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "Contact", href: "contact.html" },
];

const TONES = ["green", "blue", "orange"];

const DEPARTMENTS = [
  { name: "Kaya Chikitsa", desc: "General medicine — internal disorders, chronic disease management and pulse-based diagnosis." },
  { name: "Shalya Tantra", desc: "Ayurvedic surgery, wound care, ksharsutra therapy and pre/post-operative management." },
  { name: "Panchakarma", desc: "The five classical purification therapies — Vamana, Virechana, Basti, Nasya and Raktamokshana." },
  { name: "Shalakya Tantra", desc: "Diseases of the eye, ear, nose, throat and head; including Ayurvedic ophthalmology." },
  { name: "Prasuti Tantra & Stri Roga", desc: "Obstetrics, gynaecology and women's health across the reproductive lifecycle." },
  { name: "Dravyaguna Vigyan", desc: "Study of medicinal plants — identification, properties and therapeutic action." },
  { name: "Rasashastra & Bhaishajya Kalpana", desc: "Ayurvedic pharmaceutics, mineral processing and classical drug formulation." },
  { name: "Agad Tantra", desc: "Toxicology, forensic medicine and medical jurisprudence in Ayurvedic practice." },
  { name: "Samhita & Siddhanta", desc: "Foundational classical texts — Charaka, Sushruta and Ashtanga Hridaya." },
  { name: "Kriya Sharir", desc: "Human physiology explained through Tridosha, Sapta Dhatu and Agni theory." },
  { name: "Rachana Sharir", desc: "Human anatomy — Ayurvedic and applied, through dissection and structured study." },
  { name: "Swasthavritta & Yoga", desc: "Preventive medicine, public health, diet science and yogic practice." },
  { name: "Roga Nidan & Vikriti Vigyan", desc: "Diagnostic methods, pathology and clinical examination technique." },
  { name: "Sanskrit & Ithihas", desc: "Classical Sanskrit language and the history of Ayurvedic science." },
].map((d, i) => ({ ...d, tone: TONES[i % TONES.length] }));

function DeptIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 20C4 10 11 4 20 4c0 9-6 16-16 16Z" />
      <path d="M4 20c3-6 7-10 13-13" />
    </svg>
  );
}

function TridoshaMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle className="c-vata" cx="24" cy="22" r="15" />
      <circle className="c-pitta" cx="38" cy="22" r="15" />
      <circle className="c-kapha" cx="31" cy="36" r="15" />
    </svg>
  );
}

/* Decorative botanical corner motif — same signature element used on the
   Courses page, so the two pages read as one identity. */
function LeafMotif({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g fill="none" strokeWidth="2.5" strokeLinecap="round">
        <path d="M110 200 C 60 160, 40 100, 70 40 C 100 90, 100 150, 110 200 Z" fill="var(--green)" opacity="0.9" />
        <path d="M110 200 C 150 165, 175 110, 150 45 C 120 95, 115 155, 110 200 Z" fill="var(--blue)" opacity="0.85" />
        <path d="M110 200 C 130 150, 150 120, 195 105 C 175 145, 150 175, 110 200 Z" fill="var(--orange)" opacity="0.9" />
        <path d="M110 30 L110 200" stroke="#fff" strokeOpacity="0.5" />
      </g>
      <circle cx="110" cy="200" r="7" fill="var(--green-deep)" />
    </svg>
  );
}

/* Wheel motif for the CTA band — eight spokes nod to Ashtanga Ayurveda,
   the eight classical branches referenced in the hero copy. */
function AshtangaWheel({ className = "" }) {
  const spokes = Array.from({ length: 8 });
  return (
    <svg className={className} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
      <circle cx="60" cy="60" r="10" fill="var(--orange)" />
      {spokes.map((_, i) => {
        const angle = (i * 360) / spokes.length;
        const colors = ["var(--blue)", "var(--green)", "var(--orange)"];
        return (
          <line
            key={i}
            x1="60"
            y1="60"
            x2={60 + 50 * Math.cos((angle * Math.PI) / 180)}
            y2={60 + 50 * Math.sin((angle * Math.PI) / 180)}
            stroke={colors[i % colors.length]}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.85"
          />
        );
      })}
    </svg>
  );
}

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

export default function DepartmentPage() {
  const [menuOpen, setMenuOpen] = useState(false);

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

        .sam-site .page-hero { background: linear-gradient(135deg, var(--green-soft) 0%, var(--blue-soft) 55%, #fff 100%); padding: 48px 0 40px; }
        .sam-site .hero-row { display: flex; align-items: center; justify-content: space-between; gap: 30px; }
        .sam-site .hero-copy { max-width: 620px; }
        .sam-site .hero-art { width: 140px; height: 140px; flex-shrink: 0; opacity: 0.95; }
        .sam-site .crumb { font-size: 13px; color: var(--muted); margin-bottom: 10px; }
        .sam-site .eyebrow { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
        .sam-site .page-hero h1 { font-family: var(--display); font-size: 36px; color: var(--green-deep); margin: 0 0 10px; }
        .sam-site .page-hero p { color: var(--muted); max-width: 620px; margin: 0; }

        .sam-site section { padding: 44px 0; }
        .sam-site .dept-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .sam-site .dept-card { background: #fff; border: 1px solid var(--line); border-top: 3px solid transparent; border-radius: 14px; padding: 24px 20px; transition: border-color .2s ease, transform .2s ease; }
        .sam-site .dept-card:hover { transform: translateY(-2px); }
        .sam-site .dept-card.tone-green { border-top-color: var(--green); }
        .sam-site .dept-card.tone-blue { border-top-color: var(--blue); }
        .sam-site .dept-card.tone-orange { border-top-color: var(--orange); }
        .sam-site .dept-card .ico-wrap { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 12px; }
        .sam-site .dept-card.tone-green .ico-wrap { background: var(--green-soft); }
        .sam-site .dept-card.tone-blue .ico-wrap { background: var(--blue-soft); }
        .sam-site .dept-card.tone-orange .ico-wrap { background: var(--orange-soft); }
        .sam-site .dept-card.tone-green .ico { color: var(--green); }
        .sam-site .dept-card.tone-blue .ico { color: var(--blue); }
        .sam-site .dept-card.tone-orange .ico { color: var(--orange); }
        .sam-site .dept-card .ico { width: 22px; height: 22px; }
        .sam-site .dept-card h4 { margin: 0 0 8px; font-family: var(--display); color: var(--green-deep); font-size: 15.5px; line-height: 1.3; }
        .sam-site .dept-card p { margin: 0; color: var(--muted); font-size: 13.5px; line-height: 1.55; }

        .sam-site .cta-band { background: var(--green-deep); color: #fff; border-radius: 18px; padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; position: relative; overflow: hidden; }
        .sam-site .cta-band .cta-copy { max-width: 560px; z-index: 1; }
        .sam-site .cta-band h3 { font-family: var(--display); font-size: 21px; margin: 0 0 6px; }
        .sam-site .cta-band p { margin: 0; color: #cfe3d8; font-size: 14.5px; }
        .sam-site .cta-band .cta-actions { display: flex; align-items: center; gap: 22px; z-index: 1; }
        .sam-site .cta-band .btn-primary { background: var(--orange); color: #fff; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 14.5px; white-space: nowrap; transition: background .2s ease; }
        .sam-site .cta-band .btn-primary:hover { background: #fff; color: var(--green-deep); }
        .sam-site .cta-band .wheel { width: 78px; height: 78px; flex-shrink: 0; }

        .sam-site footer.site { background: var(--green-deep); color: #eaf3ee; padding: 48px 0 18px; margin-top: 20px; position: relative; }
        .sam-site footer.site::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--blue), var(--green), var(--orange)); }
        .sam-site .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; }
        .sam-site .footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .sam-site .footer-brand .name { font-family: var(--display); font-weight: 700; font-size: 17px; color: #fff; }
        .sam-site .footer-grid p { font-size: 13.5px; color: #cfe3d8; line-height: 1.6; }
        .sam-site .footer-grid h4 { font-family: var(--display); font-size: 15px; margin: 0 0 12px; color: #fff; }
        .sam-site .footer-grid ul { list-style: none; margin: 0; padding: 0; }
        .sam-site .footer-grid li { margin-bottom: 8px; }
        .sam-site .footer-grid ul a { font-size: 13.5px; color: #cfe3d8; }
        .sam-site .footer-grid ul a:hover { color: var(--orange); }
        .sam-site .footer-bottom { border-top: 1px solid rgba(255,255,255,.15); margin-top: 30px; padding-top: 16px; display: flex; justify-content: space-between; font-size: 12.5px; color: #a9c6b8; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 1000px) {
          .sam-site .dept-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 900px) {
          .sam-site .footer-grid { grid-template-columns: 1fr 1fr; }
          .sam-site .hero-art { display: none; }
        }
        @media (max-width: 760px) {
          .sam-site .primary, .sam-site .nav-cta { display: none; }
          .sam-site .nav-toggle { display: flex; }
          .sam-site .footer-grid { grid-template-columns: 1fr; }
          .sam-site .dept-grid { grid-template-columns: 1fr 1fr; }
          .sam-site .cta-band { flex-direction: column; align-items: flex-start; }
          .sam-site .cta-band .wheel { display: none; }
        }
        @media (max-width: 480px) {
          .sam-site .dept-grid { grid-template-columns: 1fr; }
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
            <div className="eyebrow">Sam Ayurveda</div>
            <h1>Departments</h1>
            <p>Fourteen departments covering the eight classical branches of Ayurveda and its foundational sciences, each led by qualified faculty.</p>
          </div>
          <LeafMotif className="hero-art" />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="dept-grid">
            {DEPARTMENTS.map((d) => (
              <div className={`dept-card tone-${d.tone}`} key={d.name}>
                <div className="ico-wrap">
                  <DeptIcon className="ico" />
                </div>
                <h4>{d.name}</h4>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div className="cta-copy">
              <h3>Want to know which department teaches what, year by year?</h3>
              <p>The full BAMS curriculum breaks this down professional by professional.</p>
            </div>
            <div className="cta-actions">
              <AshtangaWheel className="wheel" />
              <a className="btn btn-primary" href="courses.html">View Curriculum</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}