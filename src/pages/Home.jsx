// src/pages/Home.jsx
import React from 'react';
import CountUp from 'react-countup';
import '../App.css';

function Home() {
  return (
    <>
      <section id="hero" className="hero-section" data-aos="fade-up">
  <div className="hero-container">
    <div className="hero-text">
      <h1>
        <span className="highlight">India's First</span> <br /> AI + Legal Cyber Shield 🚨
      </h1>
      <p className="tagline">
        Your smart defence against scams, frauds & digital crime. <br />
        <span className="subtag">Bharat-first. Justice-focused. AI-powered.</span>
      </p>
      <button className="cta-btn">🚀 Try the Prototype</button>
    </div>

    <div className="hero-image-container">
      <img
        src="/hero.png"
        alt="Cyber Shield Illustration"
        className="hero-illustration"
      />
    </div>
  </div>
  <div className="hero-glow"></div>
</section>

      <section className="impact-section" data-aos="fade-up">
        <h2 className="section-heading">📊 Our Impact (and Growing)</h2>
        <div className="impact-cards">
          <div className="impact-card">
            <h3><CountUp end={25678} duration={3} separator="," />+</h3>
            <p>Scams Detected</p>
          </div>
          <div className="impact-card">
            <h3><CountUp end={2441} duration={3} separator="," />+</h3>
            <p>FIRs Generated</p>
          </div>
          <div className="impact-card">
            <h3><CountUp end={51300} duration={3} separator="," />+</h3>
            <p>Users Protected</p>
          </div>
        </div>
      </section>

      <div className="image-grid">
  <img src="/scam1.png" alt="Phishing Scam" />
  <img src="/scam2.png" alt="UPI Fraud" />
  <img src="/scam3.png" alt="Telegram Sextortion" />
</div>


      {/* Chat Simulation */}
      <section className="chat-preview" data-aos="fade-up">
        <h2 className="section-heading">💬 How CyberCop Helps You</h2>
        <div className="chat-box">
          <div className="chat-msg user">👤 I lost ₹10,000 in a UPI fraud.</div>
          <div className="chat-msg bot">🤖 Sorry to hear that! You can file a Zero-FIR using this auto-generated format:</div>
          <div className="chat-msg bot">📄 [Click here to download your FIR]</div>
        </div>
      </section>

      <div className="prompt-box">
        <p>🧠 Ask CyberCop: <i>"Someone threatened me on Instagram. What can I do?"</i></p>
      </div>


      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-heading" data-aos="fade-up">✨ Why CyberCop Stands Out</h2>
        <div className="features-grid">
          <div className="feature-card" data-aos="zoom-in">
            <h3>🔍 Instant Scam Checker</h3>
            <p>Paste any suspicious message or link. We detect & decode it — instantly.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in">
            <h3>📄 FIR Generator</h3>
            <p>Answer a few prompts and get a downloadable FIR in PDF, AI-powered.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in">
            <h3>🤖 AI Legal Bot</h3>
            <p>Confused about your rights? Ask away. Our bot speaks Gen-Z legal!</p>
          </div>
          <div className="feature-card" data-aos="zoom-in">
            <h3>🗺️ Real-Time Scam Map</h3>
            <p>Visualize where frauds are happening. Stay a step ahead.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in">
            <h3>🎓 Awareness Booster</h3>
            <p>Mini quizzes, guides, stories — learn cyber safety, the fun way!</p>
          </div>
          <div className="feature-card" data-aos="zoom-in">
            <h3>📚 Scam Library</h3>
            <p>Explore India-specific scam types, from sextortion to UPI frauds.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" data-aos="fade-up">
        <h2 className="section-heading">💡 Real People. Real Impact.</h2>
        <div className="testimonial-grid">
          <blockquote>
            “I used CyberCop to file my FIR and it saved me hours of confusion. Super easy!”
            <span>— Rohit, Chandigarh</span>
          </blockquote>
          <blockquote>
            “As a student, I feel more protected knowing I have CyberCop in my pocket.”
            <span>— Meera, Pune</span>
          </blockquote>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section" data-aos="fade-up">
        <h2 className="section-heading">🛠️ Our Journey</h2>
        <ul className="timeline">
          <li><strong>June 2025</strong> — Idea Born 🚀</li>
          <li><strong>Now</strong> — Prototype Phase 💻</li>
          <li><strong>Aug 2025</strong> — Launching Soon 🌍</li>
        </ul>
      </section>

      <section className="cta-section" data-aos="fade-up">
        <h2>India Needs CyberCop 🇮🇳</h2>
        <p>
          Every second, someone's getting scammed online. CyberCop brings AI + law to your rescue. Join the revolution.
        </p>
        <button className="cta-btn">✨ Join the Waitlist</button>
      </section>
    </>
  );
}

export default Home;
