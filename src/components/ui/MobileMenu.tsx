import { X } from "lucide-react";
import { NAVITEMS } from "../../constants/NAVITEMS";
import Button from "./Button";
import NavItem from "./NavItem";

const MobileMenu = ({
  isOpen,
  userName,
  onClose,
  onLogout,
}: {
  isOpen: boolean;
  userName?: string;
  onClose: () => void;
  onLogout: () => void;
}) => {
  const combinedNavItems = [...NAVITEMS, { path: "/profile", name: "Profile" }];

  return (
    <div
      className={`fixed bg-slate-100 dark:bg-slate-700 top-0 right-0 h-full w-64 shadow-lg p-6 transform transition-transform duration-150 z-50  ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } md:hidden`}
      role="navigation"
      aria-label="Mobile Menu"
    >
      <div className="flex justify-between items-center pl-2 mb-6">
        <h2 className="text-lg font-bold">Menu</h2>
        <button onClick={onClose} aria-label="Close menu" aria-expanded={isOpen}>
          <X size={24} />
        </button>
      </div>
      <div className="flex flex-col justify-between h-full pb-20">
        <nav>
          <ul className="flex flex-col gap-4">
            {combinedNavItems.map((item) => (
              <li key={item.path}>
                <NavItem to={item.path} onClick={onClose}>
                  {item.name}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-3 flex flex-col items-center gap-6">
          <span>{userName}</span>
          <Button
            onClick={onLogout}
            className="bg-slate-800 font-medium text-md w-full active:bg-slate-900 hover:bg-slate-900"
          >
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MobileMenu;
