import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return (
      <button className="h-8 w-8" aria-label="Toggle theme">
        <Sun className="opacity-0" />
      </button>
    );
  }

  return (
    <div className="relative group">
      <button
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="relative h-8 w-8 rounded-full flex items-center justify-center overflow-hidden"
      >
        <div className="relative h-6 w-6">
          <Moon
            stroke="oklch(55.1% 0.027 264.364)"
            fill="oklch(55.1% 0.027 264.364)"
            size={26}
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              theme === "light" ? "-translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
            }`}
          />
          <Sun
            stroke="oklch(79.5% 0.184 86.047)"
            size={26}
            strokeWidth={1}
            fill="oklch(79.5% 0.184 86.047)"
            className={`absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${
              theme === "light" ? "translate-y-6 opacity-0 rotate-45" : "translate-y-0 opacity-100 rotate-0"
            }`}
          />
        </div>
      </button>
      <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 text-xs font-medium rounded-md bg-slate-700 opacity-0 group-hover:opacity-100 dark:bg-slate-500 text-slate-200 transition-opacity pointer-events-none whitespace-nowrap">
        {theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      </span>
    </div>
  );
}
