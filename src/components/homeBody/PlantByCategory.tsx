import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import Loader from "../shared/Loader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const PlantByCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);

  return (
    <div className="my-24 container mx-auto">
      <div>
        <h1 className="text-4xl font-medium pb-16 text-center">
          Plant Category
        </h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            340: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data?.data?.map((categoryItem, index) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl border">
                <div className="rounded-xl">
                  <img
                    src={categoryItem.image}
                    alt={categoryItem.name}
                    className="w-full h-[300px] sm:h-[400px] object-cover rounded-xl"
                  />
                </div>
                <div className="absolute border rounded-xl bg-[#f5f5fe] left-1/2 transform -translate-x-1/2 bottom-10 w-[90%] h-[140px] pt-4 flex flex-col items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-medium text-center">
                    {categoryItem.name}
                  </h1>
                  <NavLink to={`shop/category/${categoryItem._id}`}>
                    <Button className="text-[#81ba00] text-lg font-medium hover:bg-transparent hover:underline">
                      Shop now
                    </Button>
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default PlantByCategory;
