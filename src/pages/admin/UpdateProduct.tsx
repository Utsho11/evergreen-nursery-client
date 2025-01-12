import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import formBg from "@/assets/formbg.jpg";
import {
  useGetPlantsWithoutPageQuery,
  useUpdatePlantMutation,
} from "@/redux/features/plantApi";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { TPlant } from "@/redux/features/plantSlice";

interface IFormInput {
  title?: string;
  description?: string;
  price?: number;
  email?: string;
  quantity?: number;
  rating?: number;
  category?: string;
}

const UpdateProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { id } = useParams();
  const { data } = useGetPlantsWithoutPageQuery();

  const plant = data?.find((plant) => plant._id === id);

  const { toast } = useToast();

  useEffect(() => {
    if (plant) {
      reset({
        title: plant.title,
        description: plant.description,
        price: plant.price,
        email: plant.email,
        quantity: plant.quantity,
        rating: plant.rating,
        category: plant.category,
      });
    }
  }, [plant, reset]);

  const [updatePlant] = useUpdatePlantMutation();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const updatePlantData = async () => {
      // Define `updatedPlant` excluding the `_id` field
      const updatedPlant: Partial<Omit<TPlant, "_id">> = {
        title: data.title ?? plant?.title,
        description: data.description ?? plant?.description,
        price: data.price ?? plant?.price,
        email: data.email ?? plant?.email,
        quantity: data.quantity ?? plant?.quantity,
        rating: data.rating ?? plant?.rating,
        category: data.category ?? plant?.category,
      };

      try {
        await updatePlant({ id: id!, updatedPlant }).unwrap();
        toast({
          title: "Plant updated successfully",
          duration: 3000,
          className: "bg-white text-green-500",
        });
      } catch (error) {
        console.error("Error updating plant:", error);
        toast({
          title: "Error updating plant",
          duration: 3000,
          className: "bg-white text-red-500",
        });
      }
    };

    updatePlantData();
  };

  return (
    <div className="my-32 container mx-auto">
      <div className="text-center mb-32">
        <h1 className="text-5xl font-medium">UPDATE PLANT DATA</h1>
      </div>
      <div
        style={{
          backgroundImage: `url(${formBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="text-white p-32 bg-fixed"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-10 flex flex-col py-16"
        >
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="title" className="text-lg font-bold">
                  Title:
                </label>
                <input
                  defaultValue={plant?.title}
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="text"
                  {...register("title")}
                />
              </div>
              <div className="text-center">
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="category" className="text-lg font-bold">
                  Category:
                </label>
                <input
                  defaultValue={plant?.category}
                  size={20}
                  className="p-2 border border-gray-300 rounded col-span-5 text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="text"
                  {...register("category")}
                />
              </div>
              <div className="text-center">
                {errors.category && (
                  <p className="text-red-500">{errors.category.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="quantity" className="text-lg font-bold">
                  Quantity:
                </label>
                <input
                  defaultValue={plant?.quantity}
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="number"
                  step="1"
                  {...register("quantity", {
                    min: {
                      value: 0,
                      message: "Quantity must be a positive number.",
                    },
                  })}
                />
              </div>
              <div className="text-center">
                {errors.quantity && (
                  <p className="text-red-500">{errors.quantity.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="price" className="text-lg font-bold">
                  Price:
                </label>
                <input
                  defaultValue={plant?.price}
                  type="number"
                  step="0.01"
                  size={20}
                  className="p-2 col-span-5 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  {...register("price", {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Price must be a positive number.",
                    },
                  })}
                />
              </div>
              <div className="text-center">
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="email" className="text-lg font-bold">
                  Email:
                </label>
                <input
                  defaultValue={plant?.email}
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="email"
                  {...register("email")}
                />
              </div>
              <div className="text-center">
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-6 gap-3 items-center">
                <label htmlFor="rating" className="text-lg font-bold">
                  Rating:
                </label>
                <input
                  defaultValue={plant?.rating}
                  type="number"
                  step="0.01"
                  size={20}
                  className="p-2 col-span-5 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  {...register("rating", {
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Rating must be between 0 and 5.",
                    },
                    max: {
                      value: 5,
                      message: "Rating must be between 0 and 5.",
                    },
                  })}
                />
              </div>
              <div className="text-center">
                {errors.rating && (
                  <p className="text-red-500">{errors.rating.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-5"> */}
          <div>
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="text-lg font-bold">
                Description:
              </label>
              <textarea
                defaultValue={plant?.description}
                cols={10}
                rows={8}
                className="p-2 w-full border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                {...register("description")}
              />
            </div>
            <div className="text-center">
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* </div> */}
          <div className="mx-auto">
            <Button
              type="submit"
              className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
            >
              Update Plant
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
