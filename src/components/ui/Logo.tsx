import { Link } from "react-router-dom";

import LogoImage from "../../assets/logo.webp";

const Logo = () => (
  <Link to="/flights" className="text-2xl py-3 font-medium flex justify-center items-center" aria-label="Go to Flights">
    <img className="h-7 mt-0.5 sm:h-10 " src={LogoImage} alt="logo space cargo" />
    <span className="sr-only">Space Cargo</span>
    <span className="text-orange-700 dark:text-amber-600">Space</span>
    <span className="text-slate-600 dark:text-slate-400">Cargo</span>
  </Link>
);
export default Logo;
