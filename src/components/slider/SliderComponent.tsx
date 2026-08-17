import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import slider1 from "@/assets/main-banner-1.webp";
import slider2 from "@/assets/main-banner-2.webp";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from "lucide-react";

const slides = [
  {
    image: slider1,
    tag: "Seasonal Spring Harvest",
    tagIcon: <Sparkles size={13} className="text-[#a3e635]" />,
    discount: "Flat 40% Discount",
    titlePrimary: "Bring Living Serenity",
    titleHighlight: "Into Your Modern Home",
    description:
      "Hand-selected indoor monsteras, peace lilies, and rare ficus cultivated with 100% organic potting soil for cleaner air and lush indoor sanctuaries.",
    ctaText: "Shop Living Botanicals",
    ctaLink: "/shop",
    features: ["100% Organic Grown", "Air-Purifying Species", "30-Day Guarantee"],
  },
  {
    image: slider2,
    tag: "Desert & Sun-Loving Flora",
    tagIcon: <Leaf size={13} className="text-emerald-300" />,
    discount: "Flat 50% Discount",
    titlePrimary: "Resilient Exotic Cacti",
    titleHighlight: "& Desert Succulents",
    description:
      "Low-maintenance, drought-tolerant desert varieties that thrive on bright windowsills with minimal watering and effortless beauty.",
    ctaText: "Explore Succulent Collection",
    ctaLink: "/shop",
    features: ["Low Maintenance", "Direct Sun Tolerant", "Safe Eco-Packaging"],
  },
  {
    image: slider1,
    tag: "New Plant Parent Special",
    tagIcon: <Sparkles size={13} className="text-[#a3e635]" />,
    discount: "Extra 20% OFF First Order",
    titlePrimary: "Curated Starter Kits",
    titleHighlight: "& Care Guidance",
    description:
      "Complete beginner-friendly botanical bundles with self-watering terracotta pots, moisture meters, and organic nutrient feeds.",
    ctaText: "Browse Beginner Plants",
    ctaLink: "/shop",
    features: ["Free Nursery Guidance", "Easy-Care Guarantee", "Free Delivery $100+"],
  },
];

const SliderComponent = () => {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      <Swiper
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper overflow-hidden"
        pagination={{ clickable: true }}
        navigation
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[660px] flex items-center">
            {/* Background Image with Ambient Zoom */}
            <div
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="absolute inset-0 w-full h-full scale-105 transition-transform duration-1000"
            />

            {/* Gradient Scrim for Contrast & Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/30 dark:from-slate-950/95 dark:via-slate-950/75 dark:to-slate-950/40" />

            {/* Slide Content */}
            <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10 py-12 flex flex-col justify-center items-start text-left max-w-4xl space-y-6">
              {/* Badge & Discount Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  {slide.tagIcon}
                  <span>{slide.tag}</span>
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#81ba00] text-white text-xs font-black uppercase tracking-wider shadow-sm">
                  {slide.discount}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-md">
                {slide.titlePrimary} <br />
                <span className="text-[#a3e635] drop-shadow-xs">{slide.titleHighlight}</span>
              </h1>

              {/* Description */}
              <p className="text-xs sm:text-base text-slate-200 dark:text-slate-300 max-w-2xl leading-relaxed">
                {slide.description}
              </p>

              {/* Dual Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <NavLink to={slide.ctaLink}>
                  <Button className="bg-[#81ba00] hover:bg-[#70a400] text-white rounded-full text-xs sm:text-sm font-extrabold px-7 py-6 flex items-center gap-2.5 shadow-lg shadow-[#81ba00]/30 hover:shadow-xl hover:shadow-[#81ba00]/40 hover:scale-105 transition-all">
                    <span>{slide.ctaText}</span>
                    <ArrowRight size={16} />
                  </Button>
                </NavLink>

                <NavLink to="/blogs">
                  <Button
                    variant="outline"
                    className="rounded-full text-xs sm:text-sm font-bold px-6 py-6 bg-white/10 hover:bg-white/20 text-white border-white/25 backdrop-blur-md transition-all hover:scale-105"
                  >
                    Plant Care Guides
                  </Button>
                </NavLink>
              </div>

              {/* Micro Trust Features */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 font-medium">
                {slide.features.map((feature, fIdx) => (
                  <span key={fIdx} className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-[#81ba00]" />
                    <span>{feature}</span>
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderComponent;
