import React from "react";
import profile from "../assets/profile.png";
import "../styles/About.css"; // Import styles for the About page

const About = () => {
  return (
    <div className="about-container">
      {/* Personal Introduction Section */}
      <section className="intro-section">
        <div className="intro-text">
          <h1>
            Hello, I'm <span className="highlight">Naga Pujith Kumar</span>
          </h1>
          <p>
            Full Stack Web Developer passionate about building user-centric,
            scalable web applications. I specialize in optimizing performance,
            enhancing user experiences, and collaborating in agile teams to
            deliver high-quality projects.
          </p>
          <a
            href={require('../assets/Resume.pdf')}
            target="_blank"
            class="resume-button"
          >
            <button class="btn">View My Resume</button>
          </a>
        </div>
        <div className="intro-image">
          <img src={profile} alt="Naga Pujith Kumar" className="profile-pic" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>Tasty Corner</h3>
            <p>
              A food delivery web app connecting users to nearby restaurants. It
              includes an admin panel, food cards, authentication, and cashout
              options.
            </p>
            <a
              href="https://tasty-corner.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Visit Project...
            </a>
          </div>
          <div className="project-card">
            <h3>Emoji Game Application</h3>
            <p>
              A fun and interactive emoji game where players click unique emoji
              cards without repetition. Tracks scores and provides feedback
              through win/loss cards.
            </p>
            <a href="https://emojigame.ccbp.tech/" className="project-link">
              Visit Project...
            </a>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <h2 className="section-title">My Experience</h2>
        <div className="experience-timeline">
          <div className="timeline-item">
            <h3>Front End Web Developer</h3>
            <span className="timeline-date">Oct 2024 - Jan 2025</span>
            <p>
              Developed the Deployment Automation module under the AppAnySite
              Project, enhancing client experiences with detailed deployment
              information.
            </p>
          </div>
          <div className="timeline-item">
            <h3>Intern at Oasis InfoByte</h3>
            <span className="timeline-date">Jan 2024</span>
            <p>
              Implemented foundational knowledge in web application development,
              focusing on HTML, CSS, JavaScript, and React JS, improving
              proficiency in modern web technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section">
        <h2 className="section-title">Skills & Tools</h2>
        <div className="skills-list">
          <div className="skill-card">
            <h3>Programming Languages</h3>
            <p>C, C++, Python, Java, Data Structures & Algorithms</p>
          </div>
          <div className="skill-card">
            <h3>Web Development Tools</h3>
            <p>
              HTML, CSS, JavaScript, React.js, Node.js, Express.js, MongoDB,
              SQL, Git
            </p>
          </div>
          <div className="skill-card">
            <h3>Soft Skills</h3>
            <p>
              Problem-solving, Team Collaboration, Effective Communication, Time
              Management
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Let's Build Something Amazing!</h2>
          <p>
            If you're interested in working together or want to chat about web
            development, feel free to reach out.
          </p>
          <button className="cta-button">Get In Touch</button>
        </div>
      </section>
    </div>
  );
};

export default About;
