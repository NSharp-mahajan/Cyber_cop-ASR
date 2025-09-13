import React, { useState } from 'react';
import jsPDF from 'jspdf';

function FIRGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    incident: '',
    location: '',
    language: 'english',
  });
  const [showResult, setShowResult] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(generateFIRContent(), 10, 10);
    doc.save('FIR.pdf');
  };

  const generateFIRContent = () => {
    const { name, contact, incident, location, language } = formData;

    if (language === 'hindi') {
      return `सेवा में,\nथाना प्रभारी,\nस्थान: ${location}\n\nविषय: साइबर अपराध की शिकायत\n\nमहोदय,\n\nमैं, ${name}, संपर्क नंबर ${contact}, आपको सूचित करता हूँ कि मेरे साथ निम्नलिखित साइबर अपराध हुआ:\n${incident}\n\nकृपया उचित कार्रवाई करें।\n\nधन्यवाद,\n${name}`;
    } else {
      return `To,\nThe Officer-in-Charge,\nPolice Station: ${location}\n\nSubject: Complaint regarding cybercrime\n\nRespected Sir/Madam,\n\nI, ${name}, Contact: ${contact}, would like to file a report regarding the following cybercrime incident:\n${incident}\n\nKindly take the necessary action regarding this matter.\n\nThank you,\n${name}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateFIRContent());
    alert('📋 FIR content copied to clipboard!');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📄 AI-Powered FIR Generator</h1>
      <section className="fir-intro">
  <h2>🚨 About the FIR Generator</h2>
  <p>
    In a world of rising cyber threats, filing a First Information Report (FIR) shouldn’t be complicated. 
    That’s why we built the <strong>CyberCop FIR Generator</strong> — a tool designed to empower every citizen 
    to report scams and frauds effortlessly.
  </p>
  <div className="fir-feature-grid">
  <div className="feature-card">✅ AI-Based FIR Generation</div>
  <div className="feature-card">📄 PDF Download & Preview</div>
  <div className="feature-card">🤖 Smart Assistant Guidance</div>
  <div className="feature-card">🌐 Hindi & English Support</div>
  <div className="feature-card">🇮🇳 Made for Bharat, by Bharat</div>
</div>

  <p>
    This tool bridges the gap between technology and justice — ensuring that your voice is heard, 
    your rights are protected, and your case is strong. It's fast, free, and made for every citizen of India.
  </p>
</section>

      <p style={styles.subtext}>
        Report cybercrimes in seconds. Switch between English and Hindi, preview your FIR, and download it instantly.
      </p>

      {!showResult ? (
        <div style={styles.form}>
          <label style={styles.label}>🧑‍💼 Full Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rohan Sharma"
            style={styles.input}
          />

          <label style={styles.label}>📞 Contact Number</label>
          <input
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            style={styles.input}
          />

          <label style={styles.label}>📍 Location of Incident</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Delhi"
            style={styles.input}
          />

          <label style={styles.label}>📝 Describe the Cybercrime</label>
          <textarea
            name="incident"
            rows="4"
            value={formData.incident}
            onChange={handleChange}
            placeholder="e.g. Lost ₹5,000 via fake UPI link..."
            style={styles.textarea}
          />
          <p style={styles.tip}>🤖 AI Tip: Include amount lost, platform used, date/time, and screenshots if available.</p>

          <div style={styles.toggleRow}>
            <span style={{ color: '#ccc' }}>🌐 Language:</span>
            <select name="language" value={formData.language} onChange={handleChange} style={styles.select}>
              <option value="english">English</option>
              <option value="hindi">हिन्दी</option>
            </select>
          </div>

          <button style={styles.button} onClick={() => setShowResult(true)}>🚀 Preview FIR</button>
        </div>
      ) : (
        <div style={styles.result}>
          <h2 style={styles.previewHeading}>📄 FIR Preview</h2>
          <pre style={styles.preview}>{generateFIRContent()}</pre>
          <div style={styles.btnGroup}>
            <button style={styles.copyBtn} onClick={copyToClipboard}>📋 Copy</button>
            <button style={styles.downloadBtn} onClick={generatePDF}>⬇️ Download PDF</button>
            <button style={styles.backBtn} onClick={() => setShowResult(false)}>🔙 Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

// 💅 CSS-in-JS (Inline styles)
const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '50px 20px',
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '12px',
  },
  heading: {
    fontSize: '2.2rem',
    color: '#60a5fa',
    textAlign: 'center',
  },
  subtext: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#94a3b8',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
    color: '#f1f5f9',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#f1f5f9',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #334155',
    background: '#1e293b',
    color: '#f1f5f9',
    fontSize: '1rem',
  },
  select: {
    background: '#1e293b',
    color: '#f1f5f9',
    padding: '8px 12px',
    border: '1px solid #334155',
    borderRadius: '6px',
    marginLeft: '10px',
  },
  toggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  tip: {
    fontSize: '0.9rem',
    color: '#86efac',
    marginTop: '-10px',
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    background: 'linear-gradient(to right, #3b82f6, #06b6d4)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  result: {
    marginTop: '20px',
  },
  previewHeading: {
    color: '#7dd3fc',
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  preview: {
    background: '#1e293b',
    color: '#e0f2fe',
    padding: '20px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap',
    marginBottom: '1rem',
    border: '1px solid #334155',
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  copyBtn: {
    backgroundColor: '#14b8a6',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  downloadBtn: {
    backgroundColor: '#6366f1',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  backBtn: {
    backgroundColor: '#475569',
    color: '#fff',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default FIRGenerator;
