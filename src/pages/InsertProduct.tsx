import { Button } from "@/components/ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import formBg from "@/assets/formbg.jpg";
import { usePostPlantsMutation } from "@/redux/features/plantApi";
import { useToast } from "@/components/ui/use-toast";

interface IFormInput {
  title: string;
  image: FileList;
  description: string;
  price: number;
  quantity: number;
  email: string;
  rating: number;
  category: string;
}

const image_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

console.log(image_hosting_token);

const InsertProduct = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { toast } = useToast();

  const [postPlant] = usePostPlantsMutation();
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(img_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgresponse) => {
        if (imgresponse.success) {
          const imgURL = imgresponse.data.display_url;
          const {
            title,
            description,
            price,
            email,
            quantity,
            rating,
            category,
          } = data;
          const newPlant = {
            title,
            description,
            price,
            email,
            quantity,
            rating,
            category,
            image: imgURL,
          };

          postPlant(newPlant);
          reset();

          toast({
            title: "Plant added successfully",
            duration: 3000,
            className: "bg-white text-green-500", //
          });
        }
      });
  };

  return (
    <div className="my-32 container mx-auto">
      <div className="text-center mb-32">
        <h1 className="text-5xl font-medium">INSERT PLANT DATA</h1>
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
              <div className="grid grid-cols-6 gap-3  items-center">
                <label htmlFor="category" className="text-lg font-bold">
                  Title:
                </label>
                <input
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="text"
                  {...register("title", { required: "Title is required" })}
                />
              </div>
              <div className="text-center">
                {errors.title && (
                  <p className="text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>
            <div>
              <div className="grid grid-cols-6 gap-3  items-center">
                <label htmlFor="category" className="text-lg font-bold">
                  Category:
                </label>
                <input
                  size={20}
                  className="p-2 border border-gray-300 rounded col-span-5 text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                  })}
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
              <div className="grid grid-cols-6 gap-3  items-center">
                <label htmlFor="quantity" className="text-lg font-bold">
                  Quantity:
                </label>
                <input
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="number"
                  step="1"
                  {...register("quantity", {
                    required: "Quantity is required",
                    valueAsNumber: true,
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
                  type="number"
                  step="0.01"
                  size={20}
                  className="p-2 col-span-5 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  {...register("price", {
                    required: "Price is required",
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
              <div className="grid grid-cols-6 gap-3  items-center">
                <label htmlFor="email" className="text-lg font-bold">
                  Email:
                </label>
                <input
                  size={20}
                  className="p-2 border border-gray-300 col-span-5 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
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
                  type="number"
                  step="0.1"
                  size={20}
                  className="p-2 col-span-5 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                  {...register("rating", {
                    required: "Rating is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Rating must be a positive number.",
                    },
                    max: {
                      value: 5,
                      message: "Rating can not be more than 5.",
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

          <div>
            <div className="flex flex-col gap-3">
              <label htmlFor="description" className="text-lg font-bold">
                Description:
              </label>
              <textarea
                rows={8}
                className="p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                {...register("description", {
                  required: false,
                })}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>
          <div className="space-x-5">
            <label htmlFor="image" className="text-lg font-bold">
              Select a Image:
            </label>
            <input type="file" {...register("image", { required: false })} />
            {errors.image && (
              <p className="text-red-500 text-pretty">{errors.image.message}</p>
            )}
          </div>
          <div className="mx-auto">
            <Button
              type="submit"
              className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default InsertProduct;
