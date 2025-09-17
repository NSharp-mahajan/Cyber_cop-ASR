import React, { useState } from "react";

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-full max-w-md mt-6">
      <h2 className="text-2xl font-bold text-blue-400 mb-4">⚡ Secure Password Generator</h2>
      <button
        onClick={() => setGeneratedPassword(generatePassword())}
        className="w-full p-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
      >
        Generate Secure Password
      </button>
      {generatedPassword && (
        <div className="mt-3">
          <p className="text-green-400 break-words">{generatedPassword}</p>
          <button
            onClick={copyToClipboard}
            className="mt-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm"
          >
            Copy
          </button>
        </div>
      )}
      <ul className="mt-4 text-sm text-gray-300 list-disc list-inside">
        <li>✅ Use Unique Passwords</li>
        <li>✅ Enable 2FA</li>
        <li>✅ Consider a Password Manager</li>
      </ul>
    </div>
  );
};

export default PasswordGenerator;
