import DiscountSection from "@/components/homeBody/DiscountSection";
import ImageGallery from "@/components/homeBody/ImageGallery";
import SliderComponent from "@/components/slider/SliderComponent";
import BlogSection from "@/components/homeBody/BlogSection";
import PlantByCategory from "@/components/homeBody/PlantByCategory";
import ProductListSection from "@/components/homeBody/ProductListSection";
import ReviewSection from "@/components/homeBody/ReviewSection";
import ServiceSection from "@/components/homeBody/ServiceSection";

const Homepage = () => {
  return (
    <div className="">
      <SliderComponent />
      <ServiceSection />
      <BlogSection />
      <PlantByCategory />
      <ProductListSection />
      <ReviewSection />
      <ImageGallery />
      <DiscountSection />
    </div>
  );
};

export default Homepage;
