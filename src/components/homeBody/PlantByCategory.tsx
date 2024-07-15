/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Category,
  Plant,
  useGetCategoriesQuery,
  useGetPlantsWithoutPageQuery,
} from "@/redux/features/plantApi";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";

const PlantByCategory = () => {
  const { data: plants, isLoading: plantsLoading } =
    useGetPlantsWithoutPageQuery();
  const { data: categories, isLoading: categoriesLoading } =
    useGetCategoriesQuery();

  if (plantsLoading || categoriesLoading) {
    return <div>Loading...</div>;
  }

  if (!plants || !categories) {
    return <div>No data available</div>;
  }

  const getUniqueCategoryItems = (plants: Plant[], _categories: Category[]) => {
    const categoryMap = new Map();

    plants.forEach((plant) => {
      if (!categoryMap.has(plant.category)) {
        categoryMap.set(plant.category, plant);
      }
    });

    return Array.from(categoryMap.values());
  };

  const uniqueCategoryItems = getUniqueCategoryItems(plants, categories);

  return (
    <div className="mb-32 container mx-auto">
      <div>
        <h1 className="text-4xl font-medium pb-16 text-center">
          Plant Category
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 gap-y-20 ">
        {uniqueCategoryItems.map((categoryItem, index) => (
          <div key={index} className="relative rounded-xl">
            <div className="rounded-xl">
              <img src={categoryItem.image} alt="" />
            </div>
            <div className="absolute border rounded-xl bg-[#f5f5fe] left-12 -bottom-10 w-[340px] h-[140px] pt-4 flex flex-col items-center gap-2">
              <h1 className="text-3xl font-medium">{categoryItem.category}</h1>
              <NavLink to={`shop/category/${categoryItem.category}`}>
                <Button className="text-[#81ba00] text-lg font-medium hover:bg-transparent hover:underline">
                  Shop now
                </Button>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantByCategory;
