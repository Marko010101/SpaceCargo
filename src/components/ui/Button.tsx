import { NavLink } from "react-router-dom";

type ButtonProps = {
  children: React.ReactNode;
  to?: string;
  className?: string;
  onClick?: () => void;
  bare?: boolean; // NEW: skip base styles
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  children,
  to,
  className = "",
  onClick,
  type = "button",
  bare = false,
  ...buttonProps
}) => {
  const baseClasses = bare
    ? ""
    : "bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `${baseClasses} ${isActive ? "bg-slate-800 dark:bg-slate-900" : ""} ${className}`}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default Button;
