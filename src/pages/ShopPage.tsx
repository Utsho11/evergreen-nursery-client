import { useState } from "react";
import ShopSideBar from "@/components/shared/ShopSideBar";
import PlantCard from "@/components/shared/PlantCard";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { useGetPlantsQuery } from "@/redux/services/plantApi";
import { useLocation, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ShopPage = () => {
  const params = useParams();
  // Get the location object
  const location = useLocation();

  // Create a URLSearchParams object to parse the query string
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("keyword");

  const [category, setCategory] = useState<string | null>(
    params.name as string
  );
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [page, setPage] = useState(1); // current page
  const [limit] = useState(6); // number of items per page (you can adjust this)

  const { data, isLoading } = useGetPlantsQuery({
    searchQuery,
    category,
    sortOrder,
    page,
    limit,
  });

  const { data: categoryData } = useGetCategoriesQuery(null);

  const categories = categoryData?.data || [];

  const plants = data?.data || [];

  const handleCategoryChange = (selectedCategory: string | null) => {
    setCategory(selectedCategory);
    setPage(1); // Reset to first page when changing category
  };

  const handleSortChange = (selectedSortOrder: string | null) => {
    setSortOrder(selectedSortOrder);
    setPage(1); // Reset to first page when changing sort order
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading || !plants) {
    return (
      <div className="flex justify-center items-center my-32">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <div className="container mx-auto sm:my-32 my-16">
      <div className="grid lg:grid-cols-10 md:grid-cols-8 md:gap-5 lg:gap-10">
        <div className="hidden sm:block lg:col-span-2 md:col-span-2">
          <ShopSideBar
            categories={categories}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
          />
        </div>
        <div className="sm:hidden space-y-3">
          <div className="bg-white">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem
                    value={"all"}
                    onClick={() => handleCategoryChange("")}
                  >
                    Default
                  </SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem
                      onClick={() => handleCategoryChange(category._id)}
                      key={index}
                      value={category._id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="bg-white">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectItem
                    value="asc"
                    onClick={() => handleSortChange("asc")}
                  >
                    Low to high
                  </SelectItem>
                  <SelectItem
                    value="desc"
                    onClick={() => handleSortChange("desc")}
                  >
                    High to low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="lg:col-span-8 md:col-span-6">
          {plants.length > 0 ? (
            <div className="grid gap-y-5 grid-cols-2 lg:grid-cols-3 gap-14 p-2">
              {plants?.map((plant, index) => (
                <PlantCard key={index} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-3">
              <h1 className="text-3xl font-semibold">
                There are no Plants available.
              </h1>
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex justify-center space-x-5 mt-5">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-[#81ba00] text-white px-4 py-2 rounded-lg"
            >
              Previous
            </button>
            <p className="border p-2">{page}</p>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={plants.length < limit}
              className="bg-[#81ba00] text-white px-4 py-2 rounded-lg"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
