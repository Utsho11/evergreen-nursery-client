import { useGetPlantsWithoutPageQuery } from "@/redux/features/plantApi";
import PlantCard from "../shared/PlantCard";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";

const ProductListSection = () => {
  const { data: plants } = useGetPlantsWithoutPageQuery();
  return (
    <div className="container mb-32">
      <div>
        <h1 className="text-4xl font-medium pb-16 text-center">Plant Corner</h1>
      </div>
      <div className="grid grid-cols-4 gap-8">
        {plants?.slice(0, 8).map((plant, index) => (
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
