// src/components/FIRResult.jsx
import React from "react";
import jsPDF from "jspdf";
import "../styles/FIRGenerator.css";

function FIRResult({ detail, onBack }) {
  const generateFIRText = () => {
    const { name, address, contact, date, location, incident, language } = detail;
    return language === "hi"
      ? `सेवा में,\nथाना प्रभारी,\nपुलिस स्टेशन\n\nविषय: घटना के संबंध में एफआईआर दर्ज कराने हेतु\n\nमान्यवर,\n\nमैं, ${name}, ${address} का निवासी, एक घटना की रिपोर्ट करना चाहता/चाहती हूँ जो ${date} को ${location} पर हुई थी।\n\nविवरण:\n${incident}\n\nमुझसे ${contact} पर संपर्क किया जा सकता है।\n\nकृपया उपयुक्त कार्रवाई करें।\n\nधन्यवाद।\n\nसादर,\n${name}`
      : `To,\nThe Officer In-Charge,\nPolice Station\n\nSubject: Filing of FIR regarding incident\n\nRespected Sir/Madam,\n\nI, ${name}, residing at ${address}, would like to report an incident that occurred on ${date} at ${location}.\n\nDetails:\n${incident}\n\nYou can contact me at ${contact}.\n\nKindly acknowledge and take appropriate action.\n\nThank you.\n\nSincerely,\n${name}`;
  };

  const text = generateFIRText();

  const handleDownload = () => {
    const pdf = new jsPDF();
    pdf.text(text, 10, 10);
    pdf.save("FIR.pdf");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("✅ FIR copied to clipboard!");
  };

  return (
    <div className="fir-output">
      <h2>📄 FIR Preview</h2>
      <pre>{text}</pre>
      <div className="btn-group">
        <button className="copy-btn" onClick={handleCopy}>📋 Copy</button>
        <button className="download-btn" onClick={handleDownload}>📥 Download PDF</button>
        <button className="edit-btn" onClick={onBack}>🔁 Back</button>
      </div>
    </div>
  );
}

export default FIRResult;
