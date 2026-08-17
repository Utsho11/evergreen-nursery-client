import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import testimonialBg from "@/assets/testimonial.webp";
import reviews from "@/assets/data/reviewData";
import { Quote, Sparkles, Star, CheckCircle2 } from "lucide-react";

const ReviewSection = () => {
  return (
    <section className="my-20 sm:my-32 relative overflow-hidden py-16 sm:py-24">
      {/* Background Image with Dark Emerald Layer */}
      <div
        style={{
          backgroundImage: `url(${testimonialBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 bg-fixed"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-emerald-950/80 to-slate-950/90 dark:from-slate-950/95 dark:via-slate-950/90 dark:to-slate-950/95" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/20 text-[#a3e635] text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-[#81ba00]/30 shadow-xs">
            <Sparkles size={13} />
            Community Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Loved by 10,000+ Plant Parents
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real stories from gardeners, urban botanists, and living room jungle enthusiasts.
          </p>
        </div>

        {/* Carousel Card */}
        <div className="rounded-3xl bg-white/10 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800 shadow-2xl p-6 sm:p-12 relative">
          <Quote
            size={64}
            className="absolute top-6 right-8 text-[#81ba00]/20 pointer-events-none hidden sm:block"
          />

          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper2"
            pagination={{ clickable: true }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto py-4">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} size={18} fill="currentColor" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-sm sm:text-lg text-slate-100 dark:text-slate-200 font-medium leading-relaxed italic">
                    "{review.reviews}"
                  </p>

                  {/* Reviewer Profile */}
                  <div className="flex items-center gap-4 pt-2">
                    <div className="relative">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-[#81ba00] shadow-md"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-[#81ba00] text-white rounded-full p-0.5 shadow-xs">
                        <CheckCircle2 size={14} />
                      </span>
                    </div>

                    <div className="text-left">
                      <h4 className="text-base sm:text-lg font-bold text-white leading-tight">
                        {review.name}
                      </h4>
                      <p className="text-xs text-[#a3e635] font-semibold flex items-center gap-1.5 mt-0.5">
                        <span>{review.designation}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-slate-300 text-[11px] font-normal">Verified Customer</span>
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
