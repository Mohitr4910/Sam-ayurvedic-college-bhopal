import { useState, useMemo, useEffect, useCallback } from "react";
import AnimatedContent from "../Components/AnimatedContent";
import { fetchSingle, fetchList } from "../lib/cms";

/* ---------------------------------------------------------
   Data
--------------------------------------------------------- */

const NAV_LINKS = [
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
  { label: "Hospital", href: "hospital.html", active: true },
  { label: "Facilities", href: "facilities.html" },
  { label: "Admission", href: "admission.html" },
  { label: "Placements", href: "placements.html" },
  { label: "Gallery", href: "gallery.html" },
  { label: "Contact", href: "contact.html" },
];

const STATS = [
  { num: "OPD + IPD", lbl: "Care model" },
  { num: "14", lbl: "Clinical departments" },
  { num: "6 days", lbl: "OPD per week" },
  { num: "24×7", lbl: "Emergency & IPD" },
];

const FALLBACK_OPD_DEPARTMENTS = [
  { dept: "Kaya Chikitsa", days: "Mon–Sat", focus: "General medicine" },
  { dept: "Panchakarma", days: "Mon–Sat", focus: "Purification therapies" },
  { dept: "Shalya Tantra", days: "Mon, Wed, Fri", focus: "Ayurvedic surgery" },
  { dept: "Shalakya Tantra", days: "Tue, Thu, Sat", focus: "Eye, ENT & head" },
  { dept: "Prasuti & Stri Roga", days: "Mon–Sat", focus: "Women's health" },
];

// Fallback hospital page content, shown until the CMS responds or if
// it is unreachable.
const FALLBACK_HOSPITAL = {
  title: "Hospital",
  description:
    "The hospital runs daily OPD sessions across all fourteen departments — from Kaya Chikitsa and Panchakarma to Shalakya and Prasuti Tantra — alongside inpatient beds for cases requiring extended Ayurvedic management, including classical Panchakarma protocols that need supervised, multi-day stays. Clinical postings rotate final-professional and internship students through each department under the direct supervision of departmental faculty, so every prescription and procedure is reviewed before it reaches a patient.",
  opd_timings: "Monday – Saturday, 9:00 AM – 2:00 PM",
  image: "",
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "opd", label: "OPD" },
  { key: "panchakarma", label: "Panchakarma" },
  { key: "ipd", label: "IPD Wards" },
  { key: "students", label: "Clinical Postings" },
];

const GALLERY_ITEMS = [
  {
    src: "images/hospital/opd-reception.jpg",
    alt: "OPD reception and registration counter",
    cap: "OPD reception & registration",
    cat: "opd",
    size: "big",
  },
  {
    src: "images/hospital/kaya-chikitsa-opd.jpg",
    alt: "Kaya Chikitsa OPD consultation room",
    cap: "Kaya Chikitsa OPD",
    cat: "opd",
  },
  {
    src: "images/hospital/panchakarma-table.jpg",
    alt: "Panchakarma therapy table set-up",
    cap: "Panchakarma theatre",
    cat: "panchakarma",
    size: "tall",
  },
  {
    src: "images/hospital/ipd-ward.jpg",
    alt: "General inpatient ward",
    cap: "IPD ward",
    cat: "ipd",
  },
  {
    src: "images/hospital/clinical-rounds.jpg",
    alt: "Interns on morning clinical rounds",
    cap: "Clinical rounds",
    cat: "students",
    size: "wide",
  },
  {
    src: "images/hospital/snehana-therapy.jpg",
    alt: "Snehana oil therapy in progress",
    cap: "Snehana therapy",
    cat: "panchakarma",
  },
  {
    src: "images/hospital/shalakya-opd.jpg",
    alt: "Shalakya Tantra eye and ENT OPD",
    cap: "Shalakya OPD",
    cat: "opd",
  },
  {
    src: "images/hospital/bedside-teaching.jpg",
    alt: "Faculty guiding students at patient bedside",
    cap: "Bedside teaching",
    cat: "students",
    size: "tall",
  },
  {
    src: "images/hospital/nursing-station.jpg",
    alt: "Nursing station in the IPD block",
    cap: "Nursing station",
    cat: "ipd",
  },
  {
    src: "images/hospital/pharmacy-dispensing.jpg",
    alt: "Hospital pharmacy dispensing classical formulations",
    cap: "In-house pharmacy",
    cat: "panchakarma",
    size: "wide",
  },
  {
    src: "images/hospital/case-taking.jpg",
    alt: "Case-taking session in Prasuti and Stri Roga OPD",
    cap: "Case-taking session",
    cat: "students",
  },
  {
    src: "images/hospital/opd-waiting-area.jpg",
    alt: "Patient waiting area outside the OPD block",
    cap: "OPD waiting area",
    cat: "opd",
  },
];

/* ---------------------------------------------------------
   Small pieces
--------------------------------------------------------- */

function NavList({ links, onLinkClick }) {
  return (
    <ul style={styles.navUl}>
      {links.map((item) => (
        <li key={item.label} style={{ position: "relative" }}>
          <a
            href={item.href}
            onClick={(e) => {
              if (item.href === "#") e.preventDefault();
              onLinkClick && onLinkClick();
            }}
            style={{
              ...styles.navLink,
              ...(item.active ? styles.navLinkActive : {}),
            }}
          >
            {item.label}
          </a>
          {item.dropdown && (
            <ul style={styles.dropdown}>
              {item.dropdown.map((d) => (
                <li key={d.label}>
                  <a href={d.href} style={styles.dropdownLink} onClick={onLinkClick}>
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------
   Main component
--------------------------------------------------------- */

export default function HospitalPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hospital, setHospital] = useState(FALLBACK_HOSPITAL);
  const [opdDepartments, setOpdDepartments] = useState(FALLBACK_OPD_DEPARTMENTS);

  useEffect(() => {
    let isMounted = true;
    fetchSingle("hospital").then((data) => {
      if (isMounted && data) {
        setHospital({ ...FALLBACK_HOSPITAL, ...data });
      }
    });
    fetchList("hospital_service").then((rows) => {
      if (isMounted && rows.length > 0) {
        setOpdDepartments(
          rows.map((r) => {
            // description is stored as free text, e.g.
            // "General medicine • OPD days: Mon–Sat" - split it back
            // into focus / days for the existing table columns when
            // possible, otherwise show it as-is under "focus".
            const parts = String(r.description || "").split("•").map((p) => p.trim());
            const focus = parts[0] || r.description || "";
            const daysMatch = String(r.description || "").match(/OPD days:\s*(.+)$/i);
            return {
              dept: r.name,
              focus,
              days: daysMatch ? daysMatch[1] : "",
            };
          })
        );
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const visibleItems = useMemo(
    () =>
      activeFilter === "all"
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((it) => it.cat === activeFilter),
    [activeFilter]
  );

  const openLightbox = useCallback(
    (item) => {
      const idx = visibleItems.indexOf(item);
      setLightboxIndex(idx === -1 ? 0 : idx);
      setLightboxOpen(true);
    },
    [visibleItems]
  );

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + visibleItems.length) % visibleItems.length);
  }, [visibleItems.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % visibleItems.length);
  }, [visibleItems.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, showPrev, showNext]);

  // keep index in range if filter changes while open
  useEffect(() => {
    if (lightboxIndex >= visibleItems.length) setLightboxIndex(0);
  }, [visibleItems, lightboxIndex]);

  const current = visibleItems[lightboxIndex];

  return (
    <div style={styles.page}>
      {/* Responsive rules — media queries can't live in inline style objects,
          so the breakpoint-only overrides sit here and target the classNames
          used below (hg-grid / hg-item / lb-nav / etc). Inline styles above
          still win on desktop; these narrow things down on smaller screens. */}
      <style>{`
        .hg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 150px;
          gap: 14px;
        }
        .hg-item-big { grid-column: span 2; grid-row: span 2; }
        .hg-item-wide { grid-column: span 2; }
        .hg-item-tall { grid-row: span 2; }

        @media (max-width: 900px) {
          .hg-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 160px; }
          .content-grid { grid-template-columns: 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-toggle { display: inline-flex !important; }
        }
        @media (max-width: 560px) {
          .hg-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 130px;
            gap: 8px;
          }
          .hg-item-big,
          .hg-item-wide {
            grid-column: span 2;
          }
          .hg-item-tall { grid-row: span 1; }
          .hg-head { flex-direction: column; align-items: flex-start !important; }
          .lb-nav { width: 36px !important; height: 36px !important; font-size: 18px !important; }
        }
      `}</style>

      {/* Mobile nav */}
      <div style={{ ...styles.mobileNav, ...(mobileNavOpen ? styles.mobileNavOpen : {}) }}>
        <div style={styles.mobileCloseRow}>
          <button
            aria-label="Close menu"
            onClick={() => setMobileNavOpen(false)}
            style={styles.navToggle}
          >
            ✕
          </button>
        </div>
        <NavList links={NAV_LINKS} onLinkClick={() => setMobileNavOpen(false)} />
      </div>

      {/* Page hero */}
      <section>
        <div style={styles.container}>
          <div style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap", padding: "28px 0 8px" }}>
            {hospital.image && (
              <img
                src={hospital.image}
                alt={hospital.title}
                style={{ width: 160, height: 160, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
              />
            )}
            <div>
              <h1 style={{ ...styles.h2, fontSize: 32, margin: "0 0 8px" }}>{hospital.title}</h1>
              <p style={{ ...styles.para, maxWidth: 640 }}>{hospital.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section>
        <div style={styles.container}>
          <div style={styles.statStrip}>
            {STATS.map((s) => (
              <div key={s.lbl} style={styles.statItem}>
                <span style={styles.statNum}>{s.num}</span>
                <span style={styles.statLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content grid */}
      <section style={{ paddingTop: 0 }}>
        <div className="content-grid" style={{ ...styles.container, ...styles.contentGrid }}>
          <div>
            <h2 style={styles.h2}>Outpatient &amp; inpatient services</h2>
            <p style={styles.para}>
              The hospital runs daily OPD sessions across all fourteen
              departments — from Kaya Chikitsa and Panchakarma to Shalakya and
              Prasuti Tantra — alongside inpatient beds for cases requiring
              extended Ayurvedic management, including classical Panchakarma
              protocols that need supervised, multi-day stays.
            </p>
            <p style={styles.para}>
              Clinical postings rotate final-professional and internship
              students through each department under the direct supervision of
              departmental faculty, so every prescription and procedure is
              reviewed before it reaches a patient.
            </p>
            <h3 style={styles.h3}>Departments seeing OPD patients</h3>
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <tbody>
                  <tr>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>OPD days</th>
                    <th style={styles.th}>Focus</th>
                  </tr>
                  {opdDepartments.map((row) => (
                    <tr key={row.dept}>
                      <td style={styles.td}>{row.dept}</td>
                      <td style={styles.td}>{row.days}</td>
                      <td style={styles.td}>{row.focus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={styles.formNote}>
              Full department-wise timing is displayed at the hospital
              reception and revised each academic term.
            </p>
          </div>

          <div>
            <AnimatedContent direction="vertical"   distance={200} duration={2} ease="power4.out">

            
            <div style={styles.pullCard}>
              <h4 style={styles.h4}>OPD timing</h4>
              <p style={styles.para}>
                {hospital.opd_timings}
              </p>
            </div>
            </AnimatedContent>

            <AnimatedContent direction="vertical"   distance={250} duration={2} ease="power4.out">


            <div style={{ ...styles.pullCard, marginTop: 18, borderLeftColor: "var(--gold, #b8860b)" }}>
              <h4 style={styles.h4}>Registration</h4>
              <p style={styles.para}>
                New patients register at the reception counter; a nominal OPD
                card fee applies. Bring prior prescriptions and reports where
                available.
              </p>
            </div>
            </AnimatedContent>
            <AnimatedContent direction="vertical"   distance={300} duration={2} ease="power4.out">


            <div style={{ ...styles.pullCard, marginTop: 18, borderLeftColor: "var(--red, #8c2f2f)" }}>
              <p style={styles.para}>
                (+91) 70247 70000
                <br />
                care@samayurveda.in
              </p>
            </div>
            </AnimatedContent>
          </div>
        </div>
              <h4 style={styles.h4}>Emergency contact</h4>
      </section>

      {/* ===================== HOSPITAL GALLERY ===================== */}
      <section style={styles.hgSection}>
        <div style={styles.container}>
          <div className="hg-head" style={styles.hgHead}>
            <div>
              <div style={styles.eyebrow}>Inside the hospital</div>
              <h2 style={{ ...styles.h2, marginBottom: 6 }}>
                Hospital &amp; campus in pictures
              </h2>
              <p style={styles.hgHeadPara}>
                OPD counters, Panchakarma theatres, IPD wards and student
                clinical postings — a look at where classroom Ayurveda becomes
                patient care.
              </p>
            </div>
            <div style={styles.hgFilters}>
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    ...styles.hgFilterBtn,
                    ...(activeFilter === f.key ? styles.hgFilterBtnActive : {}),
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* grid + spans now come from the .hg-grid / .hg-item-* CSS
              classes above, so the layout can change per breakpoint */}
          <div className="hg-grid">
            {visibleItems.map((item) => (
              <GalleryTile key={item.src} item={item} onClick={() => openLightbox(item)} />
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && current && (
        <div
          style={styles.lightbox}
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            aria-label="Close"
            onClick={() => setLightboxOpen(false)}
            style={styles.lbClose}
          >
            ✕
          </button>
          <button
            aria-label="Previous"
            onClick={showPrev}
            className="lb-nav"
            style={{ ...styles.lbNav, left: 10 }}
          >
            ‹
          </button>
          <div style={styles.lbImgWrap}>
            <img src={current.src} alt={current.alt} style={styles.lbImg} />
            <div style={styles.lbCap}>{current.cap}</div>
          </div>
          <button
            aria-label="Next"
            onClick={showNext}
            className="lb-nav"
            style={{ ...styles.lbNav, right: 10 }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Gallery tile
--------------------------------------------------------- */

function GalleryTile({ item, onClick }) {
  const [hover, setHover] = useState(false);
  const sizeClass =
    item.size === "big"
      ? "hg-item-big"
      : item.size === "wide"
      ? "hg-item-wide"
      : item.size === "tall"
      ? "hg-item-tall"
      : "";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={sizeClass}
      style={styles.hgItem}
    >
      <img
        src={item.src}
        alt={item.alt}
        style={{
          ...styles.hgItemImg,
          transform: hover ? "scale(1.08)" : "scale(1)",
        }}
      />
      <div
        style={{
          ...styles.hgCap,
          opacity: hover ? 1 : 0,
          transform: hover ? "translateY(0)" : "translateY(6px)",
        }}
      >
        {item.cap}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Styles (inline, since this page has no external stylesheet
   in the React version — swap for CSS classes / a stylesheet
   import if you already have one)
--------------------------------------------------------- */

const COLORS = {
  ink: "#241f1a",
  muted: "#6b6b6b",
  cream: "#faf8f3",
  card: "#e9e4d8",
  gold: "#b8860b",
  red: "#8c2f2f",
  border: "rgba(0,0,0,.12)",
};

const styles = {
  page: {
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: COLORS.ink,
    background: "#fff",
  },
  container: { maxWidth: 1160, margin: "0 auto", padding: "0 20px" },

  navUl: { display: "flex", gap: 22, listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap" },
  navLink: { textDecoration: "none", color: COLORS.ink, fontSize: 14 },
  navLinkActive: { color: COLORS.red, fontWeight: 600 },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    listStyle: "none",
    margin: 0,
    padding: 8,
    display: "none",
    minWidth: 200,
  },
  dropdownLink: { display: "block", padding: "6px 10px", textDecoration: "none", color: COLORS.ink, fontSize: 13 },

  navToggle: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 20,
  },

  mobileNav: {
    position: "fixed",
    inset: 0,
    background: "#fff",
    transform: "translateX(100%)",
    transition: "transform .25s ease",
    zIndex: 1000,
    padding: 20,
    overflowY: "auto",
  },
  mobileNavOpen: { transform: "translateX(0)" },
  mobileCloseRow: { display: "flex", justifyContent: "flex-end", marginBottom: 20 },

  pageHero: { background: COLORS.cream, padding: "48px 0" },
  eyebrow: { fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: COLORS.gold, fontWeight: 600, marginBottom: 6 },
  h1: { fontSize: "clamp(28px,4vw,42px)", margin: "0 0 10px" },
  heroPara: { color: COLORS.muted, maxWidth: 560, margin: 0 },

  statStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))",
    gap: 16,
    padding: "28px 0",
    borderBottom: `1px solid ${COLORS.border}`,
  },
  statItem: { display: "flex", flexDirection: "column", gap: 4 },
  statNum: { fontSize: 22, fontWeight: 700 },
  statLbl: { fontSize: 12, color: COLORS.muted },

  contentGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: 40,
    padding: "40px 20px",
  },
  h2: { fontSize: 26, margin: "0 0 14px" },
  h3: { fontSize: 18, margin: "24px 0 10px" },
  h4: { fontSize: 15, margin: "0 0 6px" },
  para: { color: "#3f3a34", lineHeight: 1.65, marginBottom: 14 },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", minWidth: 420, borderCollapse: "collapse", fontSize: 14 },
  th: { textAlign: "left", padding: "8px 6px", borderBottom: `2px solid ${COLORS.ink}` },
  td: { padding: "8px 6px", borderBottom: `1px solid ${COLORS.border}` },
  formNote: { fontSize: 12, color: COLORS.muted, marginTop: 12 },

  pullCard: {
    background: COLORS.cream,
    borderLeft: `4px solid ${COLORS.ink}`,
    borderRadius: 6,
    padding: "16px 18px",
  },

  hgSection: { padding: "10px 0 56px" },
  hgHead: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 24,
    flexWrap: "wrap",
    marginBottom: 28,
  },
  hgHeadPara: { maxWidth: 520, color: COLORS.muted, margin: 0 },
  hgFilters: { display: "flex", gap: 8, flexWrap: "wrap" },
  hgFilterBtn: {
    border: `1px solid ${COLORS.border}`,
    background: "transparent",
    borderRadius: 999,
    padding: "7px 16px",
    fontSize: 13,
    cursor: "pointer",
    color: "inherit",
  },
  hgFilterBtnActive: { background: COLORS.gold, borderColor: COLORS.gold, color: "#fff" },

  hgItem: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
    background: COLORS.card,
    cursor: "pointer",
  },
  hgItemImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform .5s ease",
  },
  hgCap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: "10px 12px 8px",
    background: "linear-gradient(to top, rgba(0,0,0,.72), rgba(0,0,0,0))",
    color: "#fff",
    fontSize: 12,
    letterSpacing: "0.02em",
    transition: "opacity .25s ease, transform .25s ease",
  },

  hgMore: { textAlign: "center", marginTop: 22 },
  hgMoreLink: {
    display: "inline-block",
    border: `1px solid ${COLORS.border}`,
    borderRadius: 999,
    padding: "10px 22px",
    fontSize: 14,
    textDecoration: "none",
    color: "inherit",
  },

  lightbox: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "rgba(10,10,10,.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  lbImgWrap: { maxWidth: "100%" },
  lbImg: { maxWidth: "min(900px,90vw)", maxHeight: "78vh", borderRadius: 8, display: "block", margin: "0 auto" },
  lbCap: { color: "#f1f1f1", textAlign: "center", marginTop: 12, fontSize: 14 },
  lbClose: {
    position: "absolute",
    top: 16,
    right: 16,
    color: "#fff",
    fontSize: 26,
    background: "none",
    border: "none",
    cursor: "pointer",
    zIndex: 2,
  },
  lbNav: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,.12)",
    border: "none",
    color: "#fff",
    fontSize: 22,
    width: 44,
    height: 44,
    borderRadius: "50%",
    cursor: "pointer",
    zIndex: 2,
  },
};