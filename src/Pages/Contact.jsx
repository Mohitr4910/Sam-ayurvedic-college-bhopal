import React, { useState } from "react";
import AnimatedContent from "../Components/AnimatedContent";

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
  { label: "Courses", href: "courses.html" },
  { label: "Hospital", href: "hospital.html" },
  { label: "Facilities", href: "facilities.html" },
  { label: "Admission", href: "admission.html" },
  { label: "Placements", href: "placements.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "Contact", href: "contact.html", active: true },
];

function TridoshaMark({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <circle className="c-vata" cx="24" cy="22" r="15" />
      <circle className="c-pitta" cx="38" cy="22" r="15" />
      <circle className="c-kapha" cx="31" cy="36" r="15" />
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

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formNote, setFormNote] = useState("We typically reply within one working day.");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormNote("Thank you — your message has been recorded.");
  };

  return (
    <div className="sam-site">
      <style>{`
        .sam-site {
          --green-deep: #1f4d3a;
          --green: #2f7a55;
          --green-soft: #e7f2ec;
          --blue-deep: #16406b;
          --blue: #2b78c4;
          --blue-soft: #e8f1fb;
          --orange: #e8862e;
          --orange-deep: #c9631a;
          --orange-soft: #fdf0e2;
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

        .sam-site .topbar { background: var(--blue-deep); color: #fff; font-size: 13px; }
        .sam-site .topbar .container { display: flex; justify-content: space-between; padding: 8px 20px; }
        .sam-site .topbar-left a, .sam-site .topbar-right a { color: #eaf3ee; margin-right: 18px; }
        .sam-site .topbar-right a:last-child, .sam-site .topbar-left a:last-child { margin-right: 0; }

        .sam-site header.site { background: #fff; border-bottom: 1px solid var(--line); position: relative; }
        .sam-site .nav-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; gap: 20px; }
        .sam-site .brand { display: flex; align-items: center; gap: 10px; }
        .sam-site .brand-mark { width: 40px; height: 40px; flex-shrink: 0; }
        .sam-site .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
        .sam-site .brand-text .name { font-family: var(--display); font-weight: 700; font-size: 18px; color: var(--blue-deep); }
        .sam-site .brand-text .sub { font-size: 11px; color: var(--muted); }

        .sam-site .primary ul { list-style: none; display: flex; gap: 22px; margin: 0; padding: 0; font-size: 14.5px; font-weight: 500; }
        .sam-site .primary li { position: relative; padding: 6px 0; }
        .sam-site .primary li.active > a, .sam-site .primary li a:hover { color: var(--orange); }
        .sam-site .primary li.has-drop:hover .dropdown { display: block; }
        .sam-site .dropdown { display: none; position: absolute; top: 100%; left: 0; background: #fff; border: 1px solid var(--line); border-radius: 8px; min-width: 210px; padding: 8px; box-shadow: 0 12px 24px rgba(20,40,30,.12); z-index: 20; }
        .sam-site .dropdown li { padding: 0; }
        .sam-site .dropdown li a { display: block; padding: 8px 10px; border-radius: 6px; font-weight: 400; }
        .sam-site .dropdown li a:hover { background: var(--orange-soft); color: var(--orange-deep); }

        .sam-site .nav-cta { background: var(--orange); color: #fff; padding: 10px 18px; border-radius: 999px; font-size: 14px; font-weight: 600; white-space: nowrap; }
        .sam-site .nav-toggle { display: none; background: none; border: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 6px; }
        .sam-site .nav-toggle span { width: 22px; height: 2px; background: var(--blue-deep); display: block; }

        .sam-site .mobile-nav { position: fixed; inset: 0; background: #fff; z-index: 50; transform: translateX(100%); transition: transform .25s ease; padding: 20px; overflow-y: auto; }
        .sam-site .mobile-nav.open { transform: translateX(0); }
        .sam-site .mobile-nav .close-row { display: flex; justify-content: flex-end; margin-bottom: 10px; }
        .sam-site .mobile-nav ul { list-style: none; padding: 0; margin: 0; font-size: 17px; }
        .sam-site .mobile-nav li { border-bottom: 1px solid var(--line); }
        .sam-site .mobile-nav li a { display: block; padding: 14px 4px; }
        .sam-site .mobile-nav .dropdown { display: block; position: static; border: none; box-shadow: none; padding: 0 0 10px 14px; }

        .sam-site .page-hero {
          position: relative;
          background:
            linear-gradient(135deg, rgba(22,64,107,.88), rgba(31,77,58,.82)),
            url('https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1400&auto=format&fit=crop')
            center/cover no-repeat;
          padding: 56px 0 48px;
          color: #fff;
        }
        .sam-site .crumb { font-size: 13px; color: #dce9f4; margin-bottom: 10px; }
        .sam-site .eyebrow { font-size: 12.5px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--orange); margin-bottom: 8px; }
        .sam-site .page-hero h1 { font-family: var(--display); font-size: 36px; color: #fff; margin: 0 0 10px; }
        .sam-site .page-hero p { color: #e4eef2; max-width: 560px; margin: 0; }

        .sam-site section { padding: 44px 0; }
        .sam-site .contact-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 36px; }
        .sam-site .contact-card { background: #fff; border: 1px solid var(--line); border-top: 3px solid var(--blue); border-radius: 14px; padding: 26px 22px; text-align: center; }
        .sam-site .contact-card:nth-child(2) { border-top-color: var(--orange); }
        .sam-site .contact-card:nth-child(3) { border-top-color: var(--green); }
        .sam-site .contact-card .ico { width: 30px; height: 30px; color: var(--blue); margin-bottom: 12px; }
        .sam-site .contact-card:nth-child(2) .ico { color: var(--orange); }
        .sam-site .contact-card h4 { margin: 0 0 6px; font-family: var(--display); color: var(--blue-deep); font-size: 16px; }
        .sam-site .contact-card p { margin: 0; color: var(--muted); font-size: 14.5px; }
        .sam-site .contact-card a:hover { color: var(--orange); }

        .sam-site .content-grid { display: grid; grid-template-columns: 1.1fr .9fr; gap: 28px; align-items: start; }
        .sam-site .form-card { background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 28px; }
        .sam-site .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 4px; }
        .sam-site label { display: block; font-size: 13px; font-weight: 600; color: var(--blue-deep); margin: 12px 0 6px; }
        .sam-site input, .sam-site select, .sam-site textarea {
          width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px;
          font-family: var(--body); font-size: 14px; background: #fcfdfc; color: var(--ink);
        }
        .sam-site textarea { min-height: 110px; resize: vertical; }
        .sam-site input:focus, .sam-site select:focus, .sam-site textarea:focus { outline: 2px solid var(--blue); outline-offset: 1px; }
        .sam-site .btn-primary { background: var(--orange); color: #fff; padding: 12px 24px; border-radius: 999px; font-weight: 600; font-size: 14.5px; }
        .sam-site .btn-primary:hover { background: var(--orange-deep); }
        .sam-site .form-note { margin-top: 12px; font-size: 13px; color: var(--muted); }

        .sam-site .campus-photo { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); height: 200px; }
        .sam-site .campus-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .sam-site .map-embed { border-radius: 16px; overflow: hidden; border: 1px solid var(--line); height: 220px; margin-top: 18px; }
        .sam-site .map-embed iframe { width: 100%; height: 100%; border: 0; }
        .sam-site .pull-card { background: var(--blue-soft); border-radius: 16px; padding: 22px; margin-top: 18px; border-left: 4px solid var(--blue); }
        .sam-site .pull-card h4 { margin: 0 0 8px; font-family: var(--display); color: var(--blue-deep); }
        .sam-site .pull-card p { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.6; }

        .sam-site footer.site { background: var(--blue-deep); color: #eaf3ee; padding: 48px 0 18px; margin-top: 20px; }
        .sam-site .footer-grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 28px; }
        .sam-site .footer-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .sam-site .footer-brand .name { font-family: var(--display); font-weight: 700; font-size: 17px; color: #fff; }
        .sam-site .footer-grid p { font-size: 13.5px; color: #cfe3d8; line-height: 1.6; }
        .sam-site .footer-grid h4 { font-family: var(--display); font-size: 15px; margin: 0 0 12px; color: var(--orange); }
        .sam-site .footer-grid ul { list-style: none; margin: 0; padding: 0; }
        .sam-site .footer-grid li { margin-bottom: 8px; }
        .sam-site .footer-grid ul a { font-size: 13.5px; color: #cfe3d8; }
        .sam-site .footer-grid ul a:hover { color: var(--orange); }
        .sam-site .footer-bottom { border-top: 1px solid rgba(255,255,255,.15); margin-top: 30px; padding-top: 16px; display: flex; justify-content: space-between; font-size: 12.5px; color: #a9c6b8; flex-wrap: wrap; gap: 8px; }

        @media (max-width: 900px) {
          .sam-site .content-grid { grid-template-columns: 1fr; }
          .sam-site .contact-cards { grid-template-columns: 1fr; }
          .sam-site .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 760px) {
          .sam-site .primary, .sam-site .nav-cta { display: none; }
          .sam-site .nav-toggle { display: flex; }
          .sam-site .footer-grid { grid-template-columns: 1fr; }
          .sam-site .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className={`mobile-nav${menuOpen ? " open" : ""}`}>
        <div className="close-row">
          <button className="nav-toggle" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <PrimaryNav />
      </div>

      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Get in touch</div>
          <h1>Contact</h1>
          <p>Reach the admission cell, hospital reception or campus administration.</p>
        </div>
      </section>

      <section>
        <div className="container">
            <AnimatedContent direction="vertical"   distance={200} duration={2} ease="power4.out">
          <div className="contact-cards">
           

           
            <div className="contact-card">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2Z" />
              </svg>
              <h4>Phone</h4>
              <p><a href="tel:+917024770000">(+91) 70247 70000</a></p>
            </div>
           
            <div className="contact-card">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6L22 7" />
              </svg>
              <h4>Email</h4>
              <p><a href="mailto:care@samayurveda.in">care@samayurveda.in</a></p>
            </div>
           
              
            <div className="contact-card">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <h4>Campus address</h4>
              <p>Sam Global University | Private university in central India, Gram Adampur Chawni, Raisen Rd, Kolua Khurd, Bhopal, Madhya Pradesh 462022</p>
            </div>
          </div>
            </AnimatedContent>

          <div className="content-grid">

                          <AnimatedContent direction="horizontal" reverse   distance={200} duration={2} ease="power4.out">


            <div className="form-card">
              <h4 style={{ fontFamily: "var(--display)", color: "var(--blue-deep)", fontSize: 19, marginBottom: 18 }}>
                Send a message
              </h4>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div>
                    <label htmlFor="c-name">Full name</label>
                    <input id="c-name" type="text" required />
                  </div>
                  <div>
                    <label htmlFor="c-email">Email</label>
                    <input id="c-email" type="email" required />
                  </div>
                </div>
                <div className="form-row">
                  <div>
                    <label htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" />
                  </div>
                  <div>
                    <label htmlFor="c-subj">Subject</label>
                    <select id="c-subj">
                      <option>Admission enquiry</option>
                      <option>Hospital appointment</option>
                      <option>General question</option>
                    </select>
                  </div>
                </div>
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" required></textarea>
                <button className="btn btn-primary" type="submit" style={{ marginTop: 14, border: "none", cursor: "pointer" }}>
                  Send Message
                </button>
                <p className="form-note">{formNote}</p>
              </form>
            </div>
                          </AnimatedContent>
            <div>

                          <AnimatedContent direction="horizontal"   distance={200} duration={2} ease="power4.out">
              
              <div className="campus-photo">
                <img
                  src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=1200&auto=format&fit=crop"
                  alt="Campus herb garden"
                  />
              </div>
                  </AnimatedContent>
                          <AnimatedContent direction="horizontal"   distance={200} duration={3} ease="power4.out">
              
              <div className="map-embed">
                <iframe
                    src="https://www.openstreetmap.org/export/embed.html?bbox=77.5186%2C23.2451%2C77.5386%2C23.2651&layer=mapnik&marker=23.255133561653512%2C77.5286225299004"
                    title="Campus location map"
                    loading="lazy"
                    ></iframe>
              </div>
                    </AnimatedContent>

                          <AnimatedContent direction="horizontal"   distance={200} duration={2} ease="power4.out">

                    
              <div className="pull-card">
                <h4>Office hours</h4>
                <p>Monday – Saturday, 9:00 AM – 5:00 PM<br />Hospital OPD: 9:00 AM – 2:00 PM</p>
              </div>
                          </AnimatedContent>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}