import React from "react";

type InputProps = {
  label?: string;
  id: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = ({ label, id, type = "text", placeholder, className = "", ...props }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-normal mb-1.5" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`box-border appearance-none border border-accent-800  text-sm rounded w-full py-2.5 px-3 dark:border-slate-700 leading-tight placeholder:text-sm focus:outline-none focus:ring-1 dark:focus:ring-slate-700 focus:ring-accent-800 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
