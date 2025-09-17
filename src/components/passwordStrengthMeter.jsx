import React from "react";

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0) return { label: "Very Weak", color: "bg-red-600" };
  if (score === 1) return { label: "Weak", color: "bg-orange-500" };
  if (score === 2) return { label: "Moderate", color: "bg-yellow-500" };
  if (score === 3) return { label: "Strong", color: "bg-green-500" };
  if (score === 4) return { label: "Very Strong", color: "bg-blue-600" };
};

const PasswordStrengthMeter = ({ password }) => {
  const { label, color } = getStrength(password);

  return (
    <div className="mt-4">
      {password && (
        <>
          <div className={`h-2 rounded-full ${color}`} />
          <p className="mt-2 text-sm text-gray-300">Strength: {label}</p>
        </>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
