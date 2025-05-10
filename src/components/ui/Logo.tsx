import { Link } from "react-router-dom";

const Logo = () => (
  <Link to="/flights" className="text-2xl font-medium" aria-label="Go to Flights">
    <span className="sr-only">Space Cargo</span> ✈️ <span className="text-orange-700 dark:text-amber-600">Space</span>
    <span className="text-slate-600 dark:text-slate-400">Cargo</span>
  </Link>
);
export default Logo;
