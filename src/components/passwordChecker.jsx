import React, { useState } from "react";
import PasswordStrengthMeter from './passwordStrengthMeter';

const PasswordChecker = () => {
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">🔐 Check Password Strength</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <PasswordStrengthMeter password={password} />
    </div>
  );
};

export default PasswordChecker;
