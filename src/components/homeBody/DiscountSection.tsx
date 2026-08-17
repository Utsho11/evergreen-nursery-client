import banner1 from "@/assets/cms-banner-1.webp";
import banner2 from "@/assets/cms-banner-2.webp";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, Percent } from "lucide-react";

const DiscountSection = () => {
  return (
    <section className="my-16 sm:my-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Banner 1: House Plants 30% OFF */}
        <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 min-h-[300px] sm:min-h-[340px] flex items-center">
          {/* Background Image */}
          <img
            src={banner1}
            alt="House Plants Discount Banner"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-transparent dark:from-slate-950/90 dark:via-slate-950/60" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-md space-y-4 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81ba00] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Percent size={12} />
              Flat 30% Discount
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Indoor House <br />
              <span className="text-[#a3e635]">Botanicals</span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
              Transform your living room into an oxygen-rich jungle with hardy monsteras and ficus.
            </p>

            <div className="pt-2">
              <NavLink to="/shop">
                <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs sm:text-sm font-bold px-6 py-2.5 flex items-center gap-2 shadow-md transition-all">
                  <span>Shop Collection</span>
                  <ArrowRight size={15} />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>

        {/* Banner 2: Foliage Plants 20% OFF */}
        <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-800 min-h-[300px] sm:min-h-[340px] flex items-center">
          {/* Background Image */}
          <img
            src={banner2}
            alt="Green Foliage Plants Discount Banner"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-950/50 to-transparent dark:from-slate-950/90 dark:via-slate-950/60" />

          {/* Banner Content */}
          <div className="relative z-10 p-6 sm:p-10 max-w-md space-y-4 text-white">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles size={12} />
              Flat 20% Discount
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Lush Green <br />
              <span className="text-emerald-300">Foliage Plants</span>
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100 line-clamp-2">
              Deep emerald leaves and air-purifying palms hand-selected by our nursery horticulturists.
            </p>

            <div className="pt-2">
              <NavLink to="/shop">
                <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs sm:text-sm font-bold px-6 py-2.5 flex items-center gap-2 shadow-md transition-all">
                  <span>Explore Foliage</span>
                  <ArrowRight size={15} />
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountSection;
