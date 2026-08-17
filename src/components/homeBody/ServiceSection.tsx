import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import data
import sliderData from "@/assets/data/sliderData";
import { Pagination, Autoplay } from "swiper/modules";
import { Sparkles, ArrowRight } from "lucide-react";
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
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#81ba00] hover:underline"
        >
          <span>Explore All Supplies</span>
          <ArrowRight size={14} />
        </NavLink>
      </div>

      {/* Services Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          480: { slidesPerView: 1.5, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
        }}
        className="pb-14"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-xl hover:border-[#81ba00]/30 transition-all duration-300 p-7 flex flex-col items-center text-center justify-between group">
              <div className="space-y-4 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-50 dark:bg-slate-800 flex justify-center items-center overflow-hidden relative group-hover:bg-[#81ba00] transition-colors duration-300 shadow-inner">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-contain group-hover:scale-115 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100 group-hover:text-[#81ba00] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 w-full flex items-center justify-center">
                <NavLink
                  to="/shop"
                  className="text-[11px] font-bold text-[#81ba00] hover:text-[#70a400] flex items-center gap-1 group-hover:gap-1.5 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRight size={12} />
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServiceSection;
