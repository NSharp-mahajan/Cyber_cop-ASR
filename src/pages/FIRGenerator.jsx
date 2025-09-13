import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import '../styles/FIRGenerator.css';

function FIRGenerator() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    incident: '',
    location: '',
    language: 'english',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].slice(0, 5),
  });
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generatePDF = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(12);
      doc.text(generateFIRContent(), 20, 20);
      doc.save('FIR.pdf');
      setIsGenerating(false);
    }, 1000);
  };

  const generateFIRContent = () => {
    const { name, contact, incident, location, language, date, time } = formData;
    const currentDate = new Date().toLocaleDateString('en-IN');

    if (language === 'hindi') {
      return `सेवा में,\nथाना प्रभारी,\nस्थान: ${location}\n\nविषय: साइबर अपराध की शिकायत\n\nमहोदय,\n\nमैं, ${name}, संपर्क नंबर ${contact}, आपको सूचित करता हूँ कि मेरे साथ निम्नलिखित साइबर अपराध हुआ:\n\n${incident}\n\nदिनांक: ${date}\nसमय: ${time}\n\nकृपया उचित कार्रवाई करें।\n\nधन्यवाद,\n${name}\nदिनांक: ${currentDate}`;
    } else {
      return `To,\nThe Officer-in-Charge,\nPolice Station: ${location}\n\nSubject: Complaint regarding cybercrime\n\nRespected Sir/Madam,\n\nI, ${name}, Contact: ${contact}, would like to file a report regarding the following cybercrime incident:\n\n${incident}\n\nDate of Incident: ${date}\nTime of Incident: ${time}\n\nKindly take the necessary action regarding this matter.\n\nThank you,\n${name}\nDate: ${currentDate}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateFIRContent());
    // Show a better notification
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.textContent = '📋 FIR copied to clipboard!';
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 2000);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What is an FIR?",
      answer: "An FIR (First Information Report) is a written document prepared by police when they receive information about a cognizable offense. It's crucial as it sets criminal law in motion."
    },
    {
      question: "How long does it take?",
      answer: "Our AI generates your FIR in under 30 seconds. Fill details, preview, and download instantly as PDF."
    },
    {
      question: "Is it legally valid?",
      answer: "The generated FIR is a draft you can take to your local police station. Police will verify details and register it officially."
    },
    {
      question: "What info do I need?",
      answer: "Full name, contact info, incident location, detailed description, and any supporting evidence like screenshots."
    },
    {
      question: "Can I use Hindi?",
      answer: "Yes! Our tool supports both English and Hindi. Choose your preferred language for better compatibility."
    },
    {
      question: "What cybercrimes can I report?",
      answer: "Online fraud, phishing, identity theft, cyberbullying, harassment, financial scams, and other digital crimes."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! Your data is encrypted and never stored permanently. We prioritize your privacy and security."
    },
    {
      question: "Can I edit after generating?",
      answer: "Absolutely! You can modify any field and the preview updates instantly. No need to start over."
    }
  ];

  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Generation",
      description: "Advanced AI creates comprehensive and legally structured FIRs"
    },
    {
      icon: "⚡",
      title: "Instant Processing",
      description: "Generate your FIR in seconds, not hours"
    },
    {
      icon: "📄",
      title: "PDF Download",
      description: "Download your FIR as a professional PDF document"
    },
    {
      icon: "🌐",
      title: "Multi-Language",
      description: "Support for English and Hindi languages"
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your data is encrypted and never stored permanently"
    },
    {
      icon: "🇮🇳",
      title: "Made for India",
      description: "Designed specifically for Indian legal requirements"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      text: "This tool saved me hours of confusion. I was able to file my cyber fraud complaint quickly and professionally."
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      text: "The Hindi support made it so much easier for me to understand and file my complaint properly."
    },
    {
      name: "Anita Patel",
      location: "Bangalore",
      text: "Professional, fast, and user-friendly. Exactly what every citizen needs when facing cybercrime."
    }
  ];

  return (
    <div className="fir-generator-page">
      {/* Header */}
      <header className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="gradient-text">AI-Powered FIR Generator</span>
          </h1>
          <p className="page-subtitle">
            Real-time FIR generation with live preview. Fill the form and watch your FIR come to life!
          </p>
        </div>
      </header>

      {/* Main Split Layout */}
      <div className="main-container">
        {/* Left Side - Form */}
        <div className="form-section">
          <div className="form-container">
            <div className="form-header">
              <h2 className="form-title">
                <span className="form-icon">📝</span>
                Fill Your Details
              </h2>
              <p className="form-subtitle">Complete the form and see your FIR update in real-time</p>
            </div>

            <form className="fir-form">
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">👤</span>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📞</span>
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📍</span>
                    Location of Incident
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter the location where the incident occurred"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🌐</span>
                    Language
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="english">English</option>
                    <option value="hindi">हिन्दी (Hindi)</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📅</span>
                    Date of Incident
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">🕐</span>
                    Time of Incident
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group full-width">
                <label className="form-label">
                  <span className="label-icon">📝</span>
                  Describe the Cybercrime
                </label>
                <textarea
                  name="incident"
                  rows="6"
                  value={formData.incident}
                  onChange={handleChange}
                  placeholder="Provide detailed information about the cybercrime incident..."
                  className="form-textarea"
                  required
                />
                <div className="form-tip">
                  💡 <strong>Pro Tip:</strong> Include amount lost, platform used, and any supporting evidence
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Live Preview */}
        <div className="preview-section">
          <div className="preview-container">
            <div className="preview-header">
              <h2 className="preview-title">
                <span className="preview-icon">📄</span>
                Live FIR Preview
              </h2>
              <div className="preview-actions">
                <button className="action-btn copy-btn" onClick={copyToClipboard}>
                  <span className="btn-icon">📋</span>
                  Copy
                </button>
                <button 
                  className={`action-btn download-btn ${isGenerating ? 'loading' : ''}`} 
                  onClick={generatePDF}
                  disabled={isGenerating}
                >
                  <span className="btn-icon">{isGenerating ? '⏳' : '⬇️'}</span>
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
              </div>
            </div>

            <div className="fir-document">
              <div className="document-header">
                <div className="document-title">
                  {formData.language === 'hindi' ? 'प्रथम सूचना रिपोर्ट' : 'FIRST INFORMATION REPORT'}
                </div>
                <div className="document-subtitle">
                  {formData.language === 'hindi' ? 'साइबर अपराध' : 'CYBERCRIME COMPLAINT'}
                </div>
              </div>

              <div className="document-content">
                <pre className="fir-content">{generateFIRContent()}</pre>
              </div>

              <div className="document-footer">
                <div className="footer-info">
                  <span className="footer-label">Generated by:</span>
                  <span className="footer-value">CyberCop AI</span>
                </div>
                <div className="footer-info">
                  <span className="footer-label">Date:</span>
                  <span className="footer-value">{new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help & FAQ Section */}
      <section className="help-faq-section">
        <div className="container">
          <div className="help-faq-grid">
            {/* Quick Help */}
            <div className="help-section">
              <h2 className="help-title">
                <span className="help-icon">💡</span>
                Quick Help
              </h2>
              <div className="help-tips">
                <div className="help-tip">
                  <span className="tip-icon">⚡</span>
                  <div className="tip-content">
                    <h4>Real-time Preview</h4>
                    <p>Your FIR updates instantly as you type</p>
                  </div>
                </div>
                <div className="help-tip">
                  <span className="tip-icon">🔒</span>
                  <div className="tip-content">
                    <h4>Secure & Private</h4>
                    <p>Your data is encrypted and never stored</p>
                  </div>
                </div>
                <div className="help-tip">
                  <span className="tip-icon">📱</span>
                  <div className="tip-content">
                    <h4>Mobile Friendly</h4>
                    <p>Works perfectly on all devices</p>
                  </div>
                </div>
                <div className="help-tip">
                  <span className="tip-icon">🌐</span>
                  <div className="tip-content">
                    <h4>Multi-Language</h4>
                    <p>Available in English and Hindi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
              <h2 className="faq-title">
                <span className="faq-icon">❓</span>
                Quick FAQs
              </h2>
              <div className="faq-grid">
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <button
                      className={`faq-question ${activeFAQ === index ? 'active' : ''}`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-toggle">{activeFAQ === index ? '−' : '+'}</span>
                    </button>
                    <div className={`faq-answer ${activeFAQ === index ? 'active' : ''}`}>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FIRGenerator;
