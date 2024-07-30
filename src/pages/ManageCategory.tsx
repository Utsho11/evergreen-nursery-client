import DeleteIcon from "@/assets/icons/DeleteIcon";
import EditIcon from "@/assets/icons/EditIcon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  usePostCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/plantApi";
import { SubmitHandler, useForm } from "react-hook-form";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CategoryFormInput {
  name: string;
}

const ManageCategory = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormInput>();

  const { data: categories, isLoading } = useGetCategoriesQuery();

  const { toast } = useToast();

  const [value, setValue] = useState("");

  const [addCategory] = usePostCategoryMutation();

  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    try {
      const res = await addCategory(data).unwrap();

      if (res) {
        toast({
          title: "Category added successfully",
          duration: 3000,
          className: "bg-white text-green-500",
        });
        reset();
      }
    } catch (error) {
      toast({
        title: "Error adding category",
        duration: 3000,
        className: "bg-white text-red-500",
      });
    }
  };

  const [updateCategory] = useUpdateCategoryMutation();
  const onUpdate: SubmitHandler<CategoryFormInput> = async (data) => {
    try {
      await updateCategory({ id: value!, data }).unwrap();
      toast({
        title: "Category updated successfully",
        duration: 3000,
        className: "bg-white text-green-500",
      });
    } catch (error) {
      // console.error("Error updating plant:", error);
      toast({
        title: "Something went wrong. Category can not be duplicated!",
        duration: 3000,
        className: "bg-white text-red-500",
      });
    }
  };

  const [removeCategory] = useDeleteCategoryMutation();

  const deleteCategory = (id: string | undefined) => {
    if (id) {
      removeCategory(id);
      toast({
        title: "Category is deleted successfully.",
        className: "bg-white text-green-500",
      });
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-32">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <div className="mx-auto my-32 container">
      <h1 className="text-3xl text-center font-medium mb-8">
        Manage Your Category
      </h1>
      <div>
        <div className="flex justify-center items-center border-y-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center items-center gap-x-3 py-16"
          >
            <div>
              <div className="flex gap-3  items-center">
                <label htmlFor="category" className="text-lg font-bold">
                  Insert Category:
                </label>
                <input
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="text"
                  {...register("name", { required: "Category is required" })}
                />
              </div>
              <div className="text-center">
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="">
              <Button
                type="submit"
                className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
              >
                Add Category
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-center">No.</TableHead>
              <TableHead className="font-semibold text-center">
                Category
              </TableHead>
              <TableHead className="font-semibold text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories!.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="text-center">{category.name}</TableCell>
                <TableCell className="flex justify-center">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        onClick={() => {
                          if (category._id) {
                            setValue(category._id);
                          }
                        }}
                        className="navlink hover:bg-transparent"
                      >
                        <EditIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full bg-white">
                      <form
                        onSubmit={handleSubmit(onUpdate)}
                        className="flex justify-center items-center gap-x-3 py-16"
                      >
                        <div>
                          <div className="flex gap-3 items-center">
                            <label
                              htmlFor="category"
                              className="text-lg w-full font-bold"
                            >
                              Update Category:
                            </label>
                            <input
                              size={20}
                              className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                              type="text"
                              {...register("name", {
                                required: "Category is required",
                              })}
                            />
                          </div>
                          <div className="text-center">
                            {errors.name && (
                              <p className="text-red-500">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <Button
                            type="submit"
                            className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
                          >
                            Update
                          </Button>
                        </div>
                      </form>
                    </PopoverContent>
                  </Popover>
                  <Button
                    onClick={() => deleteCategory(category._id)}
                    className="navlink hover:bg-transparent"
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageCategory;
