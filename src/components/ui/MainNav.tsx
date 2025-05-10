import { NAVITEMS } from "../../constants/NAVITEMS";
import NavItem from "./NavItem";

const MainNav = () => (
  <nav
    className="hidden bg-slate-300 md:flex gap-30 justify-center items-center dark:bg-slate-700 p-2 shadow-md"
    aria-label="Main Navigation"
  >
    <ul className="flex gap-4">
      {NAVITEMS.map((item) => (
        <li key={item.path}>
          <NavItem className="text-xl" to={item.path}>
            {item.name}
          </NavItem>
        </li>
      ))}
    </ul>
  </nav>
);
export default MainNav;
