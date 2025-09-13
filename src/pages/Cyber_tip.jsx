// src/components/CyberTip.jsx
import React from "react";
import "../styles/Cyber_tip.css";

const tips = [
  "🔒 Use strong passwords and never reuse them across platforms.",
  "🚨 Never click unknown links or download attachments from strangers.",
  "🛡️ Use 2FA (Two-Factor Authentication) on all critical accounts.",
  "📵 Don’t overshare personal info on social media — scammers watch too!",
  "👮 If scammed, report it immediately at cybercrime.gov.in.",
  "💰 Never trust ‘job offer’ emails asking for registration fees.",
];

const CyberTip = () => {
  const dayIndex = new Date().getDate() % tips.length;
  const todayTip = tips[dayIndex];

  return (
    <div className="cyber-tip-card">
      <h3>💡 Tip of the Day</h3>
      <p>{todayTip}</p>
    </div>
  );
};

export default CyberTip;
