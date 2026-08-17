import DiscountSection from "@/components/homeBody/DiscountSection";
import ImageGallery from "@/components/homeBody/ImageGallery";
import SliderComponent from "@/components/slider/SliderComponent";
import BlogSection from "@/components/homeBody/BlogSection";
import PlantByCategory from "@/components/homeBody/PlantByCategory";
import ProductListSection from "@/components/homeBody/ProductListSection";
import ReviewSection from "@/components/homeBody/ReviewSection";
import ServiceSection from "@/components/homeBody/ServiceSection";
import AnimatedSection from "@/components/shared/AnimatedSection";

const Homepage = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Hero Slider: Immediate high-impact entry */}
      <SliderComponent />

      {/* Nursery Departments Slider */}
      <AnimatedSection direction="up" delay={0.1}>
        <ServiceSection />
      </AnimatedSection>

      {/* Featured Botanical Knowledge */}
      <AnimatedSection direction="up" delay={0.15}>
        <BlogSection />
      </AnimatedSection>

      {/* Browse By Category */}
      <AnimatedSection direction="up" delay={0.1}>
        <PlantByCategory />
      </AnimatedSection>

      {/* Trending Plants Catalog */}
      <AnimatedSection direction="up" delay={0.15}>
        <ProductListSection />
      </AnimatedSection>

      {/* Customer Testimonials & Reviews */}
      <AnimatedSection direction="up" delay={0.1}>
        <ReviewSection />
      </AnimatedSection>

      {/* Pinterest Community Inspiration Gallery */}
      <AnimatedSection direction="up" delay={0.15}>
        <ImageGallery />
      </AnimatedSection>

      {/* Seasonal Promotion & Discount Banner */}
      <AnimatedSection direction="up" delay={0.1}>
        <DiscountSection />
      </AnimatedSection>
    </div>
  );
};

export default Homepage;
