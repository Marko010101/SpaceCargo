import React from "react";

interface LoaderProps {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | number; // predefined sizes or custom number
}

const Loader: React.FC<LoaderProps> = ({ fullPage = false, size = "xl" }) => {
  // Size mapping
  const sizeMap = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  };

  // Calculate dimensions
  const loaderSize = typeof size === "number" ? size : sizeMap[size] || sizeMap.md;

  return (
    <div
      className={`flex justify-center items-center ${fullPage ? "fixed inset-0 z-50" : "w-full h-full"}`}
      aria-label="Loading"
      role="status"
    >
      <div
        className="relative"
        style={{
          width: `${loaderSize}px`,
          height: `${loaderSize}px`,
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-slate-50  opacity-25" />
        <div className="absolute inset-0 rounded-full border-4 border-t-amber-400 border-transparent animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
