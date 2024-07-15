import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
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
      className="mb-32 bg-fixed container mx-auto"
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper2"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center items-center flex-col gap-3 px-32">
              <img src={review.image} alt="" className="rounded-full" />
              <div className="px-32 text-center gap-3">
                <h1 className="text-[#81ba00] font-semibold">{review.name}</h1>
                <h3 className="text-white mb-8">{review.designation}</h3>
                <p className="text-[#adadad]">{review.reviews}</p>
              </div>
              ;
            </div>
            ;
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSection;
