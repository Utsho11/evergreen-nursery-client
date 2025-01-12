import banner1 from "@/assets/cms-banner-1.webp";
import banner2 from "@/assets/cms-banner-2.webp";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const DiscountSection = () => {
  return (
    <div className="my-24 container mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
      {/* Banner 1 */}
      <div className="relative h-[325px] w-full sm:w-[50%]">
        <div className="wrapper h-full">
          <img src={banner1} alt="House Plants Discount Banner" />
        </div>
        <div style={{ color: "#222222" }} className="subbanner-description">
          <h3 className="text-xl sm:text-2xl mb-3">Flat 30% Discount</h3>
          <h1 className="text-2xl sm:text-3xl mb-5 font-semibold">
            Different House <br /> Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] rounded-full text-sm font-medium px-6 py-2">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Banner 2 */}
      <div className="relative h-[325px] w-full sm:w-[45%]">
        <div className="wrapper h-full">
          <img src={banner2} alt="Green Leaves Discount Banner" />
        </div>
        <div style={{ color: "#222222" }} className="subbanner-description">
          <h3 className="text-xl sm:text-2xl mb-3">Flat 20% Discount</h3>
          <h1 className="text-2xl sm:text-3xl mb-5 font-semibold">
            Green Leaves <br /> Plants
          </h1>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] rounded-full text-sm font-medium px-6 py-2">
              SHOP NOW
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default DiscountSection;
