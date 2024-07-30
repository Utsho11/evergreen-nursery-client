import ShopSideBar from "@/components/shared/ShopSideBar";
import {
  Plant,
  useGetPlantsQuery,
  useGetPlantsWithoutPageQuery,
} from "@/redux/features/plantApi";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PlantCard from "@/components/shared/PlantCard";
import { NavLink, useParams } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
  let newPlants: Plant[] = [];
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { name: category } = useParams();
  const sort = "price"; // Default sort field
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Fetch the data with page and pageSize parameters
  // const {
  //   data: { result: plants = [], totalCount = 0 } = {},
  //   error,
  //   isLoading,
  // } = useGetPlantsQuery({ page, pageSize });

  const {
    data: { result: plants = [], totalCount = 0 } = {},
    error,
    isLoading,
  } = useGetPlantsQuery({
    page,
    pageSize,
    sort,
    sortOrder: sortOrder as "asc" | "desc",
  });

  const { data } = useGetPlantsWithoutPageQuery();

  if (category) {
    newPlants = data!.filter((item) => item.category === category);
    newPlants = newPlants.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });
  } else {
    newPlants = plants;
  }

  const totalPages = Math.ceil(totalCount / pageSize);

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

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mx-auto my-32">
      <div className="grid grid-cols-10 gap-10">
        <div className="col-span-2">
          <ShopSideBar
            category={category ?? null}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
        <div className="col-span-8">
          {newPlants.length > 0 ? (
            <div className="grid gap-y-5 grid-cols-3 gap-14 p-2">
              {newPlants?.map((plant, index) => (
                <PlantCard key={index} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-3">
              <h1 className="text-3xl font-semibold">
                There is no Plants available for this Category.
              </h1>
              <NavLink to="/insertProduct">
                <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8">
                  Insert Plants
                </Button>
              </NavLink>
            </div>
          )}
          {category ? (
            " "
          ) : (
            <Pagination className="my-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage((prev) => prev - 1); // Go to previous page
                    }}
                  />
                </PaginationItem>

                {page > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page - 1); // Go to previous page
                      }}
                    >
                      {page - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {page > 2 && <PaginationEllipsis />}
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                {page < totalPages - 1 && <PaginationEllipsis />}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1); // Go to next page
                      }}
                    >
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (page < totalPages) setPage((prev) => prev + 1); // Go to next page
                      }}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
