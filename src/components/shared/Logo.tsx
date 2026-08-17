import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showTagline = true,
  className = "",
}) => {
  const iconDimensions = {
    sm: "w-8 h-8 rounded-xl",
    md: "w-9 sm:w-10 h-9 sm:h-10 rounded-2xl",
    lg: "w-12 h-12 rounded-2xl",
  }[size];

  const titleClasses = {
    sm: "text-base",
    md: "text-lg sm:text-xl",
    lg: "text-2xl",
  }[size];

  const tagClasses = {
    sm: "text-[8px] tracking-[0.18em]",
    md: "text-[9px] sm:text-[10px] tracking-[0.22em]",
    lg: "text-[11px] tracking-[0.25em]",
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Botanical Emblem Icon */}
      <div
        className={`${iconDimensions} flex-shrink-0 relative bg-gradient-to-br from-[#81ba00] via-[#70a400] to-[#4d7300] flex items-center justify-center shadow-md shadow-[#81ba00]/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#81ba00]/35 transition-all duration-300`}
      >
        {/* Organic botanical leaf glyph */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3/5 h-3/5 text-white drop-shadow-xs"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="currentColor" fillOpacity="0.35" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>

        {/* Small sparkling glow accent */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-lime-200/80 animate-pulse" />
      </div>

      {/* Typographic Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight font-black">
          <span className={`${titleClasses} text-slate-900 dark:text-slate-100 font-extrabold transition-colors`}>
            EVERGREEN
          </span>
          <span className={`${titleClasses} text-[#81ba00] font-black ml-1.5`}>
            NURSERY
          </span>
        </div>
        {showTagline && (
          <span
            className={`${tagClasses} font-extrabold text-slate-400 dark:text-slate-500 uppercase mt-0.5 transition-colors`}
          >
            Botanical Garden
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
