import { NavLink, NavLinkProps } from "react-router-dom";

interface NavLinkAnimatedProps extends NavLinkProps {
  className?: string;
  children: React.ReactNode;
}

const NavItem = ({ to, children, className = "", ...props }: NavLinkAnimatedProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative inline-block w-max
        before:content-[''] 
        before:absolute before:left-0 before:bottom-1.5 
        before:w-0 before:h-[2px] 
        before:bg-slate-600 dark:before:bg-slate-900 
        before:transition-all before:duration-300 
        hover:before:w-full py-2 px-3 rounded-md
        ${isActive ? "bg-slate-600  text-slate-50 dark:bg-slate-900" : ""}
        ${className}`
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
