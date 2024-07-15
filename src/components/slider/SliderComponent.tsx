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
      // spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper overflow-hidden"
    >
      <SwiperSlide
        className="object-contain"
        style={{
          backgroundImage: `url(${slider1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center">
          <h2 className="font-light text-5xl mb-8">Flat 40% Discount</h2>
          <h1 className="text-7xl mb-8 font-semibold">
            Different Lush Artificial Green Wall
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
        {/* <img className="slider-img" src={slider1}></img> */}
      </SwiperSlide>
      <SwiperSlide
        className="object-contain"
        style={{
          backgroundImage: `url(${slider2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center">
          <h2 className="font-light text-5xl mb-8">Flat 50% Discount</h2>
          <h1 className="text-7xl mb-8 font-semibold">
            Summer Garden Cactus Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
        {/* <img className="slider-img" src={slider1}></img> */}
      </SwiperSlide>
      <SwiperSlide
        className="object-contain"
        style={{
          backgroundImage: `url(${slider1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-white flex flex-col justify-center items-center">
          <h2 className="font-light text-5xl mb-8">Flat 60% Discount</h2>
          <h1 className="text-7xl mb-8 font-semibold">
            Amazing New Settler Discount
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
        {/* <img className="slider-img" src={slider1}></img> */}
      </SwiperSlide>
    </Swiper>
  );
};

export default SliderComponent;
