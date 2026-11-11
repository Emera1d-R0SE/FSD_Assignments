import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Globe2,
  GraduationCap,
  Layers3,
  Menu,
  Network,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  X
} from "lucide-react";

const fallbackFaculty = [
  {
    name: "Dr. Thenmozhi",
    designation: "Assistant Professor",
    qualification: "Ph.D. Computer Science",
    research: "Artificial intelligence, machine learning",
    image: "https://bcarvu.netlify.app/assets/faculty/Dr.-Thenmozhi-1.png"
  },
  {
    name: "Dr. Mahadev Kalyanrao Patil",
    designation: "Associate Professor",
    qualification: "Ph.D. Data Science",
    research: "Data analytics, big data",
    image: "https://bcarvu.netlify.app/assets/faculty/Dr.-Mahadev-Kalyanrao-Patil-1.png"
  },
  {
    name: "Prof. Mohammed Danish",
    designation: "Assistant Professor",
    qualification: "MCA",
    research: "Machine learning",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Mohammed-Danish-1.png"
  },
  {
    name: "Prof. Sharath Shetty B. R.",
    designation: "Assistant Professor",
    qualification: "MCA",
    research: "Software engineering",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Sharath-Shetty-B-R.png"
  },
  {
    name: "Prof. Sasikala J.",
    designation: "Assistant Professor",
    qualification: "M.Sc. Mathematics",
    research: "Applied mathematics",
    image: "https://bcarvu.netlify.app/assets/faculty/Prof.-Sasikala-Jeganathan1.png"
  }
];

const tracks = [
  { icon: Code2, number: "01", title: "Software development", detail: "Build, test and ship useful products with a strong foundation in programming and software engineering.", tags: ["Web & mobile", "Product design"] },
  { icon: Cpu, number: "02", title: "AI & data science", detail: "Turn complex data into intelligent tools using modern machine learning and analytical methods.", tags: ["Machine learning", "Data analytics"] },
  { icon: ShieldCheck, number: "03", title: "Cybersecurity", detail: "Learn to protect people, systems and information in a world that is always connected.", tags: ["Digital forensics", "Network security"] }
];

const labs = [
  { icon: Code2, title: "Programming studio", text: "A collaborative space for building web, mobile and software engineering projects." },
  { icon: Cpu, title: "AI & data lab", text: "Experiment with machine learning, visual computing and real-world data." },
  { icon: Network, title: "Networks & cloud", text: "Explore connected systems, cloud platforms and modern infrastructure." },
  { icon: Database, title: "Data systems lab", text: "Work hands-on with database design, information systems and analytics." }
];

const updates = [
  { date: "10 JUL 2026", title: "Students take on a national coding challenge", type: "Student life" },
  { date: "25 JUN 2026", title: "A hands-on introduction to AI and machine learning", type: "Workshop" },
  { date: "15 MAY 2026", title: "Industry partners meet our graduating class", type: "Careers" }
];

function SectionHeading({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading-light" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [query, setQuery] = useState("");
  const [designation, setDesignation] = useState("All faculty");
  const [faculty, setFaculty] = useState(fallbackFaculty);
  const [facultyError, setFacultyError] = useState("");
  const [formState, setFormState] = useState({ status: "idle", message: "" });

  useEffect(() => {
    let active = true;
    fetch("/api/faculty")
      .then((response) => {
        if (!response.ok) throw new Error("Faculty service is unavailable.");
        return response.json();
      })
      .then((people) => {
        if (active && Array.isArray(people) && people.length) setFaculty(people);
      })
      .catch((error) => {
        if (active) setFacultyError(`${error.message} Showing the saved directory instead.`);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % 2), 7000);
    return () => window.clearInterval(timer);
  }, []);

  const visibleFaculty = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return faculty.filter((person) => {
      const matchesQuery = !normalizedQuery || `${person.name} ${person.research} ${person.qualification}`.toLowerCase().includes(normalizedQuery);
      const matchesDesignation = designation === "All faculty" || person.designation === designation;
      return matchesQuery && matchesDesignation;
    });
  }, [faculty, query, designation]);

  async function submitInquiry(event) {
    event.preventDefault();
    setFormState({ status: "sending", message: "" });
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Your message could not be sent.");
      setFormState({ status: "success", message: result.message });
      form.reset();
    } catch (error) {
      setFormState({ status: "error", message: error.message || "Unable to reach the department. Please try again." });
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>RV University</span>
        <span className="announcement-divider" />
        <span>Curiosity, meet possibility.</span>
        <a href="#programs">Discover our programs <ArrowUpRight size={13} /></a>
      </div>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="RV University Computer Applications home">
          <img className="brand-logo" src="/rvu-logo.svg" alt="RV University" />
          <span className="brand-copy"><strong>Computer Applications</strong><small>School of Computer Science & Applications</small></span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
        <nav className={menuOpen ? "main-nav nav-open" : "main-nav"} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu}>The department</a>
          <a href="#programs" onClick={closeMenu}>Programs</a>
          <a href="#faculty" onClick={closeMenu}>People</a>
          <a href="#campus" onClick={closeMenu}>Campus</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Get in touch <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="pulse-dot" /> LEARN TO MAKE WHAT'S NEXT</div>
            <h1>{activeSlide === 0 ? <>A future built<br />by <em>curiosity.</em></> : <>Ideas into<br /><em>impact.</em></>}</h1>
            <p className="hero-description">
              {activeSlide === 0
                ? "Where computing meets creativity. Find your people, explore new ideas and build the skills to shape a changing world."
                : "From intelligent systems to thoughtful software, discover a degree that moves at the speed of your ambition."}
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#programs">Explore the BCA <ArrowRight size={17} /></a>
              <a className="text-link" href="#about">Meet your department <ArrowDownRight size={17} /></a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true"><span>AS</span><span>MK</span><span>RN</span><span>+</span></div>
              <p><strong>A community that builds together</strong><br />People-first learning, real-world thinking</p>
            </div>
            <div className="hero-pagination" aria-label="Choose hero slide">
              {[0, 1].map((slide) => <button key={slide} className={activeSlide === slide ? "pagination-dot active" : "pagination-dot"} onClick={() => setActiveSlide(slide)} aria-label={`Show slide ${slide + 1}`} />)}
              <span>0{activeSlide + 1} <span className="pagination-line" /> 02</span>
            </div>
          </div>
          <div className="hero-visual">
            <img src={activeSlide === 0 ? "https://bcarvu.netlify.app/assets/images/hero1.jpg" : "https://bcarvu.netlify.app/assets/images/hero2.jpg"} alt={activeSlide === 0 ? "Department of Computer Applications students and faculty" : "Students learning at RV University"} />
            <div className="image-wash" />
            <div className="hero-sticker"><Sparkles size={16} /><span>Think boldly.<br /><strong>Build thoughtfully.</strong></span></div>
            <div className="image-caption"><span>01 — 03</span><span>Learning beyond the screen</span></div>
            <div className="image-index">RVU / CA</div>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></a>
        </section>

        <section className="stat-band" aria-label="Department highlights">
          <div><strong>01</strong><span>Undergraduate program</span></div>
          <div><strong>04</strong><span>Hands-on learning spaces</span></div>
          <div><strong>∞</strong><span>Ways to make a difference</span></div>
          <a href="#programs">Get to know us <ArrowUpRight size={16} /></a>
        </section>

        <section className="intro-section section-pad" id="about">
          <div className="intro-image-wrap">
            <img src="https://bcarvu.netlify.app/assets/faculty/hod.png" alt="Head of Department at RV University" />
            <div className="image-note"><span className="note-icon"><Sparkles size={17} /></span><span>Knowledge with<br /><strong>purpose.</strong></span></div>
          </div>
          <div className="intro-copy">
            <span className="eyebrow">A PLACE TO BEGIN</span>
            <h2>Computer science is about people, <em>not just machines.</em></h2>
            <p>We bring technology, imagination and human insight into the same room. Here, you will learn by doing: asking better questions, building with care and finding your own way to solve problems that matter.</p>
            <p>Small learning communities, curious faculty and a hands-on approach make your time here a launchpad for wherever computing takes you.</p>
            <a className="underlined-link" href="#people">Meet the people behind it <ArrowRight size={17} /></a>
            <div className="quote-card"><span>“</span><p>We want every student to leave with the confidence to create—not only keep up with change, but help lead it.</p><small>THE DEPARTMENT TEAM</small></div>
          </div>
        </section>

        <section className="program-section section-pad" id="programs">
          <div className="program-top">
            <SectionHeading eyebrow="FIND YOUR WAY IN" title={<>A degree with<br /><em>room to explore.</em></>} copy="Start with the fundamentals. Follow the questions that interest you. Graduate ready to turn knowledge into meaningful work." />
            <div className="program-meta"><span className="meta-number">03</span><span>WAYS OF THINKING<br />ONE BCA DEGREE</span><ArrowDownRight size={20} /></div>
          </div>
          <div className="track-list">
            {tracks.map(({ icon: Icon, number, title, detail, tags }) => (
              <article className="track-row" key={number}>
                <span className="track-number">{number}</span>
                <span className="track-icon"><Icon size={22} strokeWidth={1.6} /></span>
                <div className="track-main"><h3>{title}</h3><div className="track-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <p>{detail}</p>
                <a href="#contact" aria-label={`Ask about ${title}`}><ArrowUpRight size={20} /></a>
              </article>
            ))}
          </div>
          <div className="program-footnote"><span><BookOpen size={16} /> Bachelor of Computer Applications</span><span>Undergraduate · Full-time <a href="#contact">Ask us about admissions <ArrowRight size={15} /></a></span></div>
        </section>

        <section className="people-section section-pad" id="people">
          <div className="people-header" id="faculty">
            <SectionHeading eyebrow="GOOD PEOPLE, BIG IDEAS" title={<>Learn alongside<br /><em>the curious.</em></>} copy="Researchers, mentors and makers who make space for your questions—and encourage you to ask bigger ones." />
            <div className="faculty-filters">
              <label className="search-field"><Search size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a name or interest" aria-label="Search faculty by name or research" /></label>
              <label className="select-field"><span className="sr-only">Filter by designation</span><select value={designation} onChange={(event) => setDesignation(event.target.value)}><option>All faculty</option><option>Professor</option><option>Associate Professor</option><option>Assistant Professor</option></select><ChevronDown size={15} /></label>
            </div>
          </div>
          {facultyError && <p className="directory-notice" role="status">{facultyError}</p>}
          <div className="faculty-grid">
            {visibleFaculty.length ? visibleFaculty.map((person, index) => (
              <article className="faculty-card" key={person.name}>
                <div className="faculty-photo"><img src={person.image} alt={person.name} loading="lazy" /><span>0{index + 1}</span><a href="#contact" aria-label={`Contact about ${person.name}`}><ArrowUpRight size={17} /></a></div>
                <div className="faculty-info"><span>{person.designation}</span><h3>{person.name}</h3><p>{person.qualification}</p><small>{person.research}</small></div>
              </article>
            )) : <p className="empty-search">No faculty match that search. Try another name or research area.</p>}
          </div>
          <div className="faculty-foot"><span>Good questions are always welcome.</span><a className="underlined-link" href="#contact">Say hello <ArrowRight size={17} /></a></div>
        </section>

        <section className="campus-section section-pad" id="campus">
          <div className="campus-heading"><SectionHeading eyebrow="MAKE, TEST, TRY AGAIN" title={<>Learning happens<br /><em>everywhere.</em></>} copy="Step outside the lecture and into a space designed for experimenting, sharing and making the next version better." /></div>
          <div className="campus-grid">
            <div className="campus-feature">
              <img src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=85" alt="Students working together on a technical project" loading="lazy" />
              <div className="campus-feature-overlay"><span>YOUR IDEAS, IN GOOD COMPANY</span><h3>From first sketch<br />to working prototype.</h3><a href="#contact">Explore campus life <ArrowUpRight size={17} /></a></div>
            </div>
            <div className="lab-list">{labs.map(({ icon: Icon, title, text }, index) => <article className="lab-row" key={title}><span className="lab-icon"><Icon size={20} strokeWidth={1.6} /></span><div><span className="lab-index">0{index + 1} / LEARNING SPACE</span><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="lab-arrow" size={18} /></article>)}</div>
          </div>
        </section>

        <section className="outcomes-section" id="placements">
          <div className="outcomes-photo"><img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=85" alt="A team working together in a modern office" loading="lazy" /><span>LEARN TO CONTRIBUTE, WHEREVER YOU GO.</span></div>
          <div className="outcomes-copy"><span className="eyebrow">A DEGREE THAT OPENS DOORS</span><h2>Make a career<br />that <em>means something.</em></h2><p>Technical skill is a starting point. We help you pair it with communication, collaboration and the confidence to keep learning—so you can find your place in a world that never stands still.</p><div className="outcome-points"><span><Check size={16} /> Project-led learning</span><span><Check size={16} /> Career-ready skills</span><span><Check size={16} /> A network that grows with you</span></div><a className="button button-light" href="#contact">Start a conversation <ArrowRight size={17} /></a></div>
        </section>

        <section className="updates-section section-pad">
          <div className="updates-top"><SectionHeading eyebrow="HAPPENING AROUND HERE" title={<>Little snapshots<br /><em>of what’s next.</em></>} /><a className="underlined-link" href="#contact">More from the department <ArrowRight size={17} /></a></div>
          <div className="updates-list">{updates.map((item, index) => <article className="update-row" key={item.title}><span className="update-index">0{index + 1}</span><div className="update-date"><span>{item.date}</span><small>{item.type}</small></div><h3>{item.title}</h3><a href="#contact" aria-label={`Ask about ${item.title}`}><ArrowUpRight size={20} /></a></article>)}</div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="contact-copy"><span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span><h2>Have a question?<br /><em>We’re listening.</em></h2><p>Tell us what you’re curious about. Our team will help you find the right next step.</p><div className="contact-detail"><span className="contact-detail-icon"><Globe2 size={18} /></span><span><small>FIND US</small><strong>RV University, Bengaluru, Karnataka</strong></span></div><div className="contact-detail"><span className="contact-detail-icon"><BriefcaseBusiness size={18} /></span><span><small>WRITE TO US</small><strong>bca@rvu.edu.in</strong></span></div><div className="contact-detail"><span className="contact-detail-icon"><GraduationCap size={19} /></span><span><small>OFFICE HOURS</small><strong>Monday – Friday, 9 am – 5 pm</strong></span></div></div>
          <form className="contact-form" onSubmit={submitInquiry}>
            <div className="form-top"><span>LET'S START A CONVERSATION</span><span>01 / 01</span></div>
            <label>Your name<input name="name" type="text" placeholder="How should we address you?" required maxLength={100} /></label>
            <label>Email address<input name="email" type="email" placeholder="you@example.com" required maxLength={254} /></label>
            <label>What’s on your mind?<input name="subject" type="text" placeholder="Admissions, programs, campus life…" required maxLength={160} /></label>
            <label>Your message<textarea name="message" rows="3" placeholder="A little context helps us point you in the right direction." required maxLength={3000} /></label>
            <button type="submit" className="button button-dark form-submit" disabled={formState.status === "sending"}>{formState.status === "sending" ? "Sending…" : "Send your message"} <Send size={16} /></button>
            {formState.message && <p className={`form-feedback ${formState.status}`} role="status">{formState.status === "success" && <Check size={16} />}{formState.message}</p>}
            <small className="form-note">Your details are only used to respond to your enquiry.</small>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home"><img className="brand-logo" src="/rvu-logo.svg" alt="RV University" /><span className="brand-copy"><strong>Computer Applications</strong><small>School of Computer Science & Applications</small></span></a>
          <p>Big questions.<br /><em>Useful answers.</em></p>
          <div className="footer-links"><a href="#about">Our department</a><a href="#programs">BCA program</a><a href="#faculty">Our people</a><a href="#contact">Contact</a></div>
          <a className="back-top" href="#home">BACK TO TOP <ArrowUpRight size={16} /></a>
        </div>
        <div className="footer-bottom"><span>© 2026 RV University · Department of Computer Applications</span><span>Made for people who keep asking “what if?” <Layers3 size={14} /></span></div>
      </footer>
    </>
  );
}

export default App;
