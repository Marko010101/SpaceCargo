import { Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "./ui/Logo";
import MainNav from "./ui/MainNav";
import MobileMenu from "./ui/MobileMenu";
import { UserDropdown } from "./ui/UserDropdown";

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
  });

  const userName = `${user?.firstNameEn} ${user?.lastNameEn}`;

  return (
    <>
      <header className="relative border-b dark:border-b-slate-500 border-b-slate-300  sm:border-b-0 px-4 max-w-[1600px] mx-auto flex justify-between items-center">
        <Logo />
        <div ref={ref}>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserDropdown userName={userName} handleSingout={handleLogout} />
            <button
              className="md:hidden"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <Menu size={24} />
            </button>
          </div>
          <MobileMenu isOpen={isOpen} userName={userName} onClose={() => setIsOpen(false)} onLogout={handleLogout} />
        </div>
      </header>
      <MainNav />
    </>
  );
};

export default Header;
