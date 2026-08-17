import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Trees,
  Layers,
  Wrench,
  PackageCheck,
  Droplets,
  CheckCircle2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const nurseryDepartments = [
  {
    icon: <Leaf size={28} className="text-[#81ba00]" />,
    bgGradient: "from-emerald-500/10 to-[#81ba00]/15 dark:from-emerald-950/40 dark:to-[#81ba00]/20",
    badge: "Bestseller",
    title: "Indoor Plants",
    description: "Oxygenating tropical monsteras, snake plants, and philodendrons suited for living spaces.",
    link: "/shop",
  },
  {
    icon: <Trees size={28} className="text-emerald-500" />,
    bgGradient: "from-emerald-500/10 to-teal-500/15 dark:from-emerald-950/40 dark:to-teal-950/20",
    badge: "Garden Choice",
    title: "Outdoor & Patio Flora",
    description: "Resilient perennial shrubs, flowering climbers, and sunlight-thriving decorative plants.",
    link: "/shop",
  },
  {
    icon: <Layers size={28} className="text-amber-500" />,
    bgGradient: "from-amber-500/10 to-orange-500/15 dark:from-amber-950/40 dark:to-orange-950/20",
    badge: "Organic Certified",
    title: "Nursery Potting Soil",
    description: "Bio-active, nutrient-rich soil blends with perlite for rapid root development and aeration.",
    link: "/shop",
  },
  {
    icon: <Wrench size={28} className="text-[#81ba00]" />,
    bgGradient: "from-lime-500/10 to-[#81ba00]/15 dark:from-lime-950/40 dark:to-[#81ba00]/20",
    badge: "Pro Grade",
    title: "Precision Gardening Tools",
    description: "Ergonomic bypass pruners, stainless soil scoops, and moisture testers for easy plant care.",
    link: "/shop",
  },
  {
    icon: <PackageCheck size={28} className="text-sky-500" />,
    bgGradient: "from-sky-500/10 to-indigo-500/15 dark:from-sky-950/40 dark:to-indigo-950/20",
    badge: "Handcrafted",
    title: "Artisanal Plant Pots",
    description: "Modern ceramic and breathable terracotta planters with drainage saucers for healthy roots.",
    link: "/shop",
  },
  {
    icon: <Droplets size={28} className="text-teal-400" />,
    bgGradient: "from-teal-500/10 to-emerald-500/15 dark:from-teal-950/40 dark:to-emerald-950/20",
    badge: "100% Natural",
    title: "Organic Plant Nutrients",
    description: "Slow-release seaweed fertilizers and mineral elixirs that stimulate lush leaf growth.",
    link: "/shop",
  },
];

const ServiceSection = () => {
  return (
    <section className="my-16 sm:my-24 container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Meaningful Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Nursery Departments & Care
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Curated Botanical Essentials
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Everything you need to nurture a thriving indoor sanctuary and vibrant outdoor landscape.
          </p>
        </div>

        <NavLink
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#81ba00] hover:text-[#70a400] transition-colors group flex-shrink-0"
        >
          <span>Browse All Supplies</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>

      {/* Services Slider without Pagination */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          480: { slidesPerView: 1.5, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        loop={true}
        className="w-full !overflow-visible sm:!overflow-hidden"
      >
        {nurseryDepartments.map((dept, index) => (
          <SwiperSlide key={index} className="h-auto pb-2">
            <NavLink to={dept.link} className="block h-full">
              <div className="h-full min-h-[320px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#81ba00]/40 group cursor-pointer relative overflow-hidden">
                {/* Decorative Top Ambient Light Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#81ba00]/0 to-transparent group-hover:via-[#81ba00] transition-all duration-500" />

                {/* Top Row: Badge & Index */}
                <div className="flex items-center justify-between w-full mb-5">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#81ba00] bg-[#81ba00]/10 dark:bg-[#81ba00]/15 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    {dept.badge}
                  </span>
                  <span className="text-xs font-black text-slate-300 dark:text-slate-600 group-hover:text-[#81ba00] transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon Showcase Box */}
                <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${dept.bgGradient} border border-slate-200/50 dark:border-slate-700/60 flex justify-center items-center overflow-hidden shadow-inner group-hover:scale-110 group-hover:rotate-2 group-hover:border-[#81ba00]/50 group-hover:shadow-md transition-all duration-300`}
                  >
                    {dept.icon}
                  </div>

                  {/* Title & Description with Strict Fixed Heights */}
                  <div className="space-y-1.5 w-full">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-[#81ba00] transition-colors truncate">
                      {dept.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2 min-h-[36px]">
                      {dept.description}
                    </p>
                  </div>
                </div>

                {/* Interactive Action Pill */}
                <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#81ba00] transition-colors">
                    Explore Supplies
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 group-hover:bg-[#81ba00] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 shadow-xs">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServiceSection;
