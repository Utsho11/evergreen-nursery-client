import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation } from "swiper/modules";
import testimonial from "@/assets/testimonial.webp";
import reviews from "@/assets/data/reviewData";

const ReviewSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${testimonial})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="my-24 mb-32 bg-fixed mx-auto px-4 sm:px-8 lg:px-16 py-16"
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Navigation]}
        className="mySwiper2"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col justify-center items-center gap-4 px-4 sm:px-8 lg:px-16 text-center">
              <img
                src={review.image}
                alt={review.name}
                className="rounded-full w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 object-cover"
              />
              <div className="gap-3">
                <h1 className="text-[#81ba00] font-semibold text-lg sm:text-xl lg:text-2xl">
                  {review.name}
                </h1>
                <h3 className="text-white text-sm sm:text-base lg:text-lg mb-4">
                  {review.designation}
                </h3>
                <p className="text-[#adadad] text-sm sm:text-base lg:text-lg px-2 sm:px-4">
                  {review.reviews}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
