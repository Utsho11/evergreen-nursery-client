import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import data
import sliderData from "@/assets/data/sliderData";
import { Pagination } from "swiper/modules";

const ServiceSection = () => {
  return (
    <div className="my-24 container mx-auto px-4">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={1} // Default view for small screens
        spaceBetween={20} // Default spacing between slides
        breakpoints={{
          375: { slidesPerView: 1, spaceBetween: 20 },
          640: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        className=""
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#f7f7f7] max-w-[400px] rounded-lg shadow-md text-center py-8 flex flex-col justify-between items-center">
              <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] rounded-full bg-white flex justify-center items-center overflow-hidden relative group hover:bg-[#81BA00] transition-all duration-500 ease-in-out">
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute top-8 transform -translate-y-2/3 group-hover:top-8 group-hover:transform-none transition-all duration-500 ease-in-out"
                />
              </div>
              <div className="px-6 sm:px-8">
                <h1 className="pt-6 pb-4 font-semibold text-base sm:text-lg">
                  {item.title}
                </h1>
                <p className="text-[#7e7e7e] text-xs sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceSection;
