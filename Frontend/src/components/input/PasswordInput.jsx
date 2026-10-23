
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPass, setIsShowPass] = useState(false);

  const toggleShowPass = () => {
    setIsShowPass((prev) => !prev);
  };

  return (
    <div className="flex items-center bg-transparent border-b border-gray-400 rounded px-3 mb-3">
      <input
        type={isShowPass ? "text" : "password"}
        placeholder={placeholder || "Password"}
        autoComplete="current-password"
        aria-label={placeholder || "Password"}
        value={value}
        onChange={onChange}
        required
        className={`w-full text-lg bg-transparent py-3 mr-3 outline-none rounded ${
          value ? "bg-blue-100" : "bg-transparent"
        }`}
      />

      <button
        type="button"
        onClick={toggleShowPass}
        className="cursor-pointer"
        aria-label={isShowPass ? "Hide password" : "Show password"}
      >
        {isShowPass ? (
          <FiEyeOff className="text-gray-400" size={18} />
        ) : (
          <FiEye className="text-gray-400" size={18} />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;

