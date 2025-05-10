import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./ui/Logo";
import MobileMenu from "./ui/MobileMenu";
import { UserDropdown } from "./ui/UserDropdown";
import MainNav from "./ui/MainNav";

const Header = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate("/login");
  };

  const ref = useOutsideClick(() => {
    if (isOpen) setIsOpen(false);
  }, null);

  return (
    <>
      <header className="relative p-4 max-w-[1600px] mx-auto flex justify-between items-center">
        <Logo />
        <div ref={ref}>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserDropdown userName={user?.userName} handleSingout={handleLogout} />
            <button
              className="md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>
          </div>
          <MobileMenu
            isOpen={isOpen}
            userName={user?.userName}
            onClose={() => setIsOpen(false)}
            onLogout={handleLogout}
          />
        </div>
      </header>
      <MainNav />
    </>
  );
};

export default Header;
