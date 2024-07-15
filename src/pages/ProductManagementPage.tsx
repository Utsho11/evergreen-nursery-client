import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeletePlantMutation,
  useGetPlantsQuery,
} from "@/redux/features/plantApi";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import EditIcon from "@/assets/icons/EditIcon";
import DeleteIcon from "@/assets/icons/DeleteIcon";
import { useToast } from "@/components/ui/use-toast";
import { NavLink } from "react-router-dom";
import EyeIcon from "@/assets/icons/EyeIcon";

const ProductManagementPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [removePlant] = useDeletePlantMutation();
  const { toast } = useToast();

  const deleteTask = (id: string | undefined) => {
    if (id) {
      removePlant(id);
      toast({
        title: "Plant is deleted successfully.",
        className: "bg-white text-green-500",
      });
    }
  };

  // Fetch the data with page and pageSize parameters
  const {
    data: { result: plants = [], totalCount = 0 } = {},
    error,
    isLoading,
  } = useGetPlantsQuery({ page, pageSize });

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="my-32 container mx-auto">
      <div>
        <h1 className="text-5xl font-medium my-16 text-center">
          Lists Of Plants
        </h1>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">No.</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plants.map((plant, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {index + 1 + (page - 1) * pageSize}
                </TableCell>
                <TableCell>{plant.title}</TableCell>
                <TableCell>{plant.category}</TableCell>
                <TableCell>{plant.quantity}</TableCell>
                <TableCell>$ {plant.price}</TableCell>
                <TableCell className="flex justify-center">
                  <NavLink to={`update/${plant._id}`}>
                    <Button className="navlink hover:bg-transparent">
                      <EditIcon />
                    </Button>
                  </NavLink>
                  <Button
                    onClick={() => deleteTask(plant._id)}
                    className="navlink hover:bg-transparent"
                  >
                    <DeleteIcon />
                  </Button>
                  <NavLink to={`/shop/${plant._id}`}>
                    <Button className="navlink hover:bg-transparent">
                      <EyeIcon />
                    </Button>
                  </NavLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination>
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
      </div>
    </div>
  );
};

export default ProductManagementPage;
