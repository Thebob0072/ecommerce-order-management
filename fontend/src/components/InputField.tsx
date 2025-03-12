import React, { JSX } from "react";

interface InputFieldProps {
  icon: JSX.Element;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon, type, name, placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-3 text-gray-500">{icon}</div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full px-12 py-3 border border-gray-300 rounded-lg text-gray-500 focus:text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#007bff] transition shadow-sm"
      />
    </div>
  );
};

export default InputField;
