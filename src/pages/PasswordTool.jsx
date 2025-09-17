import React from "react";
import PasswordChecker from "../components/passwordChecker";
import PasswordGenerator from "../components/PasswordGenerator";

import "../styles/PasswordTool.css"; // make sure this line is here!

const PasswordTool = () => {
  return (
    <div className="password-tool">
      {/* Header */}
      <div className="icon">🔒</div>
      <h1>Password Strength Checker</h1>
      <p className="subtitle">
        Analyze your password security and generate ultra-secure passwords
      </p>

      {/* Two Cards */}
      <div className="password-sections">
        <div className="card">
          <h2>🔍 Check Password Strength</h2>
          <PasswordChecker />
        </div>

        <div className="card">
          <h2>⚡ Secure Password Generator</h2>
          <PasswordGenerator />

          {/* Security Tips */}
          <div className="tips">
            <p>⚠️ <span>Use Unique Passwords</span></p>
            <p>⚠️ <span>Enable 2FA</span></p>
            <p>⚠️ <span>Use Password Managers</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordTool;
