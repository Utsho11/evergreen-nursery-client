import { NavLink } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight, Sparkles } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const PlantByCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const categories = data?.data || [];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          Botanical Collections
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Shop by Plant Category
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Find the perfect botanical addition tailored to your interior space and gardening lifestyle.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="h-80 bg-slate-200 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14"
        >
          {categories.map((categoryItem) => (
            <SwiperSlide key={categoryItem._id}>
              <div className="relative rounded-3xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-300 h-[380px] bg-slate-100">
                {/* Background Image */}
                <img
                  src={categoryItem.image}
                  alt={categoryItem.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Floating Glassmorphism Info Box */}
                <div className="absolute inset-x-4 bottom-4 p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between transition-transform duration-300 group-hover:-translate-y-1">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 capitalize">
                      {categoryItem.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">Explore curated varieties</p>
                  </div>

                  <NavLink
                    to={`/shop/category/${categoryItem.name}`}
                    className="w-10 h-10 rounded-full bg-[#81ba00] hover:bg-[#72a500] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110"
                    aria-label={`Shop ${categoryItem.name}`}
                  >
                    <ArrowRight size={18} />
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default PlantByCategory;
