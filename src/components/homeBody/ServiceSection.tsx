import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import sliderData from "@/assets/data/sliderData";
const ServiceSection = () => {
  return (
    <div className="my-32 container mx-auto">
      <Swiper watchSlidesProgress={true} slidesPerView={3}>
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-[#f7f7f7] w-[400px] h-[350px] text-center py-11">
              <div className="w-[140px] h-[140px] rounded-full bg-white mx-auto flex justify-center items-center relative overflow-hidden">
                <img
                  src={item.image}
                  alt="Service"
                  className="bottom-20 relative"
                />
              </div>
              <div className="px-12">
                <h1 className="pt-[22px] pb-[17px] font-semibold text-lg">
                  {item.title}
                </h1>
                <p className="text-[#7e7e7e] text-sm">{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServiceSection;
