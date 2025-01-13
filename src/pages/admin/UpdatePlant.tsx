import { useParams } from "react-router-dom";
import ENInput from "@/components/form/ENInput";
import ENSelectField from "@/components/form/ENSelect";
import ENTextarea from "@/components/form/ENTextarea";
import { useToast } from "@/components/ui/use-toast";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import banner from "@/assets/bg/footer-parallax.webp";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  useGetSinglePlantQuery,
  useUpdatePlantMutation,
} from "@/redux/services/plantApi";

const UpdatePlant = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { data, isFetching } = useGetCategoriesQuery(null);
  const { data: plant } = useGetSinglePlantQuery(id);
  const [updatePlant, { isLoading }] = useUpdatePlantMutation();

  const categoryOptions =
    data?.data?.map((item) => {
      return { value: item._id, label: item.name };
    }) || [];

  // Initialize React Hook Form with default values
  const methods = useForm<FieldValues>({
    defaultValues: {
      title: plant?.data?.title || "",
      price: plant?.data?.price || "",
      rating: plant?.data?.rating || "",
      discount: plant?.data?.discount || "",
      quantity: plant?.data?.quantity || "",
      category: {
        value: plant?.data?.category._id || "",
        label: plant?.data?.category.name || "",
      },
      description: plant?.data?.description || "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    const formdata = new FormData();
    try {
      formdata.append("data", JSON.stringify(data));
      imageFiles.forEach((file) => formdata.append("files", file));

      // console.log(formdata.get("data"));
      await updatePlant({ id: id!, data: formdata });
      // console.log(res);

      reset();
      setImagePreviews([]);
      toast({
        title: "Success",
        description: "Plant updated successfully!",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update plant!",
      });
    }
  };

  // Update default values when plant data changes
  useEffect(() => {
    if (plant?.data) {
      Object.entries(plant.data).forEach(([key, value]) => {
        setValue(key as keyof FieldValues, value);
      });
    }
  }, [plant, setValue]);

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Update Plant
        </h1>
      </div>

      <div className="container mx-auto my-16 p-8 bg-white shadow-md rounded-lg">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <ENInput
                  name="title"
                  placeholder="Enter plant Name"
                  label="Plant Name"
                />
              </div>

              {/* Price */}
              <div>
                <ENInput
                  name="price"
                  placeholder="Enter plant Price"
                  label="Price"
                  type="number"
                />
              </div>

              {/* Rating */}
              <div>
                <ENInput
                  name="rating"
                  placeholder="Enter Rating"
                  label="Rating"
                  type="number"
                />
              </div>

              {/* Discount */}
              <div>
                <ENInput
                  name="discount"
                  placeholder="Enter Discount"
                  label="Discount%"
                  type="number"
                />
              </div>

              {/* Quantity */}
              <div>
                <ENInput
                  name="quantity"
                  placeholder="Enter Quantity"
                  label="Quantity"
                  type="number"
                />
              </div>

              {/* Category */}
              <div>
                <ENSelectField
                  name="category"
                  label="Category"
                  options={categoryOptions}
                  isLoading={isFetching}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <ENTextarea
                label="Description"
                name="description"
                placeholder="Write Plant Description"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium">Images</label>
              <label
                htmlFor="images"
                className="block w-full p-2 text-center border border-dashed border-gray-300 rounded-md cursor-pointer"
              >
                Upload Images
              </label>
              <input
                id="images"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex gap-4 my-4">
                {imagePreviews.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden"
                  >
                    <img
                      src={img}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              {isLoading ? (
                <Button disabled>
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-[#81BA00] rounded-full hover:bg-green-600"
                >
                  Update Plant
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default UpdatePlant;
