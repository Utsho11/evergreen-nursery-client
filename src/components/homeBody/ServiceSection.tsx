import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

// Import data
import sliderData from "@/assets/data/sliderData";
import { Autoplay } from "swiper/modules";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const ServiceSection = () => {
  return (
    <section className="my-16 sm:my-24 container mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Botanical Essentials
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Our Plant Care Services
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Everything you need to grow thriving indoor sanctuaries and lush outdoor gardens.
          </p>
        </div>

        <NavLink
          to="/shop"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#81ba00] hover:text-[#70a400] transition-colors group"
        >
          <span>Explore All Supplies</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </NavLink>
      </div>

      {/* Interactive Services Slider without Pagination */}
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
        className="w-full"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index} className="h-auto pb-2">
            <NavLink to="/shop" className="block h-full">
              <div className="h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#81ba00]/40 group cursor-pointer relative overflow-hidden">
                {/* Decorative Top Accent Light */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#81ba00]/0 to-transparent group-hover:via-[#81ba00] transition-all duration-500" />

                {/* Top Badge & Number */}
                <div className="flex items-center justify-between w-full mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#81ba00] bg-[#81ba00]/10 dark:bg-[#81ba00]/15 px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 size={11} />
                    Essential
                  </span>
                  <span className="text-xs font-black text-slate-300 dark:text-slate-600 group-hover:text-[#81ba00] transition-colors">
                    0{index + 1}
                  </span>
                </div>

                {/* Icon Container with 3D Hover Float */}
                <div className="flex flex-col items-center text-center space-y-4 flex-grow">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-50 to-lime-50 dark:from-slate-800 dark:to-slate-800/80 border border-emerald-100/50 dark:border-slate-700/60 flex justify-center items-center overflow-hidden relative shadow-inner group-hover:scale-108 group-hover:rotate-2 group-hover:border-[#81ba00]/40 group-hover:shadow-md transition-all duration-400">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-400"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:text-[#81ba00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Interactive Action Pill */}
                <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 group-hover:text-[#81ba00] transition-colors">
                    Shop Collection
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
