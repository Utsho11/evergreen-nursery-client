import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import slider1 from "@/assets/main-banner-1.webp";
import slider2 from "@/assets/main-banner-2.webp";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const SliderComponent = () => {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper overflow-hidden"
      pagination={{ clickable: true }}
      navigation
    >
      {/* Slide 1 */}
      <SwiperSlide
        style={{
          backgroundImage: `url(${slider1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-20">
          <h2 className="font-light text-3xl sm:text-5xl mb-4 sm:mb-8">
            Flat 40% Discount
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-4 sm:mb-8 font-semibold">
            Different Lush Artificial Green Wall
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-6 sm:px-8 py-2 sm:py-3">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide
        style={{
          backgroundImage: `url(${slider2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-20">
          <h2 className="font-light text-3xl sm:text-5xl mb-4 sm:mb-8">
            Flat 50% Discount
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-4 sm:mb-8 font-semibold">
            Summer Garden Cactus Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-6 sm:px-8 py-2 sm:py-3">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide
        style={{
          backgroundImage: `url(${slider1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center text-center px-4 sm:px-8 lg:px-20">
          <h2 className="font-light text-3xl sm:text-5xl mb-4 sm:mb-8">
            Flat 60% Discount
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-4 sm:mb-8 font-semibold">
            Amazing New Settler Discount
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-6 sm:px-8 py-2 sm:py-3">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderComponent;
