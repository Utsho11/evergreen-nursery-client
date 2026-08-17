import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import data
import sliderData from "@/assets/data/sliderData";
import { Pagination, Autoplay } from "swiper/modules";

const ServiceSection = () => {
  return (
    <section className="my-16 sm:my-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={1}
        spaceBetween={24}
        breakpoints={{
          375: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className="pb-12"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xs hover:shadow-lg transition-all duration-300 p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-2xl bg-emerald-50 dark:bg-slate-800 flex justify-center items-center overflow-hidden relative group hover:bg-[#81BA00] transition-colors duration-300 shadow-inner">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ServiceSection;
