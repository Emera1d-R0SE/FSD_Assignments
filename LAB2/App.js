import "./App.css";
import profile from "./assets/profile.png";
import cyber from "./assets/certificates/cyber.png";
import googleAI from "./assets/certificates/google_ai.png";
import python from "./assets/certificates/python.png";
import web from "./assets/certificates/web.png";

function App() {
  return (
    <div className="App">

      {/* Navigation */}

      <nav className="navbar">

        <a href="#home" className="logo">
          Resume
        </a>

        <ul>

          <li><a href="#about">About</a></li>

          <li><a href="#education">Education</a></li>

          <li><a href="#skills">Skills</a></li>

          <li><a href="#certificates">Certificates</a></li>

          <li><a href="#contact">Contact</a></li>
    

        </ul>

      </nav>

      {/* Hero */}

      <section id="home" className="hero">

        <div className="hero-text">

          <h1>Hi, I'm Amrithaa 👋</h1>

          <h2>Future Software Engineer</h2>

          <p>

            Passionate about Full Stack Development,
            Cloud Computing,
            Artificial Intelligence and UI Design.

          </p>

        </div>

        <div className="hero-image">

          <img src={profile} alt="Profile"/>

        </div>

      </section>

      {/* About */}

      <section id="about" className="section">

        <h2>About Me</h2>

        <p>

          Motivated BCA student with a strong interest in software development, 
          cloud computing, cybersecurity, and artificial intelligence. 
          Passionate about learning new technologies and building practical, real-world applications. 
          A quick learner with strong problem-solving abilities, adaptability, and a commitment to continuous improvement. Seeking opportunities to apply technical skills, gain industry experience, and grow into a software engineering role.

        </p>

      </section>

      {/* Education */}

      <section id="education" className="section">

        <h2>Education</h2>

        <div className="card">

          <h3>Bachelor of Computer Applications</h3>

          <p>RV University</p>

          <p>2024 - Present</p>

        </div>

      </section>

      {/* Skills */}

      <section id="skills" className="section">

        <h2>Skills</h2>

        <div className="skill-grid">

          <div className="skill">HTML</div>

          <div className="skill">CSS</div>

          <div className="skill">JavaScript</div>

          <div className="skill">React</div>

          <div className="skill">Python</div>

          <div className="skill">AWS</div>

        </div>

      </section>
      

      {/* Certificates */}

      <section id="certificates" className="section">

      <h2>Certificates</h2>

      <div className="certificate-grid">

        <div className="certificate-card">

            <a href={cyber} target="_blank" rel="noreferrer">
                <img src={cyber} alt="Cyber Security Certificate"/>
            </a>

            <h3>Cyber Security</h3>

            <p>Issued by Google</p>

        </div>

        <div className="certificate-card">

            <a href={googleAI} target="_blank" rel="noreferrer">
                <img src={googleAI} alt="Google AI"/>
            </a>

            <h3>Google AI Essentials</h3>

            <p>Google</p>

        </div>

        <div className="certificate-card">

            <a href={python} target="_blank" rel="noreferrer">
                <img src={python} alt="Python"/>
            </a>

            <h3>Python Programming</h3>

            <p>Certificate Issued by IBM</p>

        </div>

        <div className="certificate-card">

            <a href={web} target="_blank" rel="noreferrer">
                <img src={web} alt="Web Development"/>
            </a>

            <h3>Web Development</h3>

            <p>Certificate Issued by IBM</p>

        </div>

        </div>

            </section>

    </div>
  );
}

export default App;
