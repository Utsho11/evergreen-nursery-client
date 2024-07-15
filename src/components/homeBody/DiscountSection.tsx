import banner1 from "@/assets/cms-banner-1.webp";
import banner2 from "@/assets/cms-banner-2.webp";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
const DiscountSection = () => {
  return (
    <div className="mb-32 container mx-auto flex justify-center items-center gap-6 px-32">
      <div className="h-[325px] w-[858px]">
        <div className="wrapper">
          <img src={banner1} alt="" />
        </div>
        <div className="relative bottom-72 left-60 px-8">
          <h3 className="text-2xl mb-5">Flat 30% Discount</h3>
          <h1 className="text-3xl mb-8 font-semibold">
            Different House <br /> Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </div>
      <div className="h-[325px] w-[858px]">
        <div className="wrapper">
          <img src={banner2} alt="" />
        </div>
        <div className="relative bottom-72 left-60  px-8">
          <h3 className="text-2xl mb-5">Flat 20% Discount</h3>
          <h1 className="text-3xl mb-8 font-semibold">
            Green Leaves <br /> Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
