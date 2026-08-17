import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Track scroll progress for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(scrollPercent);
      }

      if (totalScroll > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-300">
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative w-12 h-12 rounded-full bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 text-[#81ba00] hover:text-white hover:bg-[#81ba00] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
      >
        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-slate-100 dark:text-slate-800"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="text-[#81ba00] transition-all duration-150"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
          />
        </svg>

        <ArrowUp size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default ScrollToTop;
