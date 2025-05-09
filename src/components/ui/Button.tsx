import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
