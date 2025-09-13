// src/components/FIRForm.jsx
import React, { useState } from "react";
import "../styles/FIRGenerator.css";

function FIRForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    incident: "",
    date: "",
    location: "",
    language: "en",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <form className="fir-form" onSubmit={handleSubmit}>
      <h2>📝 Fill FIR Details</h2>
      <div className="form-grid">
        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
        <input type="text" name="contact" placeholder="Contact Info" value={formData.contact} onChange={handleChange} required />
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location of Incident" value={formData.location} onChange={handleChange} required />
        <textarea name="incident" rows="4" placeholder="Describe the incident" value={formData.incident} onChange={handleChange} required></textarea>
        <select name="language" value={formData.language} onChange={handleChange}>
          <option value="en">English</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
      <button className="generate-btn" type="submit">⚡ Generate FIR</button>
    </form>
  );
}

export default FIRForm;
