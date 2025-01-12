import PlantCard from "../shared/PlantCard";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { useGetPlantsQuery } from "@/redux/services/plantApi";

const ProductListSection = () => {
  const { data: plants, isLoading } = useGetPlantsQuery(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading || !plants) {
    return (
      <div className="flex justify-center items-center my-32">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  if (!plants) {
    <div className="text-center">No data found</div>;
  }
  return (
    <div className="container mb-32">
      <div>
        <h1 className="text-4xl font-medium pb-16 text-center">Plant Corner</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {plants.data?.slice(0, 8).map((plant, index) => (
          <PlantCard key={index} plant={plant} />
        ))}
      </div>
      <div className="flex justify-center my-16">
        <NavLink to="/shop">
          <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
            Explore More
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default ProductListSection;
