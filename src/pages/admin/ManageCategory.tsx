import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import banner from "@/assets/bg/footer-parallax.webp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoryApi";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ManageCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();

  const categories = data?.data || [];

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Manage Category
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="flex justify-center sm:mx-auto gap-5 mb-8">
          {categories.length > 0 ? (
            <div className="border w-[20rem] sm:w-[70rem]">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-20 h-10 sm:h-20 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>
                        {new Date(
                          category.createdAt ?? "--"
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          onClick={() => handleDelete(category._id)}
                          size="icon"
                          variant="outline"
                        >
                          <Trash2 size={20} className="text-rose-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold ">No Category Found.</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageCategory;
