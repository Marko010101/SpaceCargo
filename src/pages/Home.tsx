import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import clsx from "clsx";

const Home = () => {
  const location = useLocation();
  const [view, setView] = useState<"city" | "country">("city");

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    if (path === "city" || path === "country") {
      setView(path);
    }
  }, [location.pathname]);

  return (
    <div>
      <Header onNavClick={setView} />

      <div className="relative mt-6 mx-auto max-w-5xl overflow-hidden rounded-lg">
        <div
          className={clsx(
            "flex transition-transform duration-500 ease-in-out",
            view === "city" ? "translate-x-0" : "-translate-x-full"
          )}
          style={{ width: "200%" }}
        >
          <div className="w-full flex-shrink-0 p-4">🌆 City content here</div>
          <div className="w-full flex-shrink-0 p-4">🌍 Country content here</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
