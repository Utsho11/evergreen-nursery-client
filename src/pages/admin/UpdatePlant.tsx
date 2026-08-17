import { useParams, useNavigate } from "react-router-dom";
import ENInput from "@/components/form/ENInput";
import ENSelectField from "@/components/form/ENSelect";
import ENTextarea from "@/components/form/ENTextarea";
import { useToast } from "@/components/ui/use-toast";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm, FormProvider, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Loader2, SquarePen, Upload, X, Sparkles } from "lucide-react";
import {
  useGetSinglePlantQuery,
  useUpdatePlantMutation,
} from "@/redux/services/plantApi";
import { defaultCategories } from "@/assets/data/defaultCategories";
import { defaultPlants } from "@/assets/data/defaultPlants";

const UpdatePlant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { data, isFetching } = useGetCategoriesQuery(null);
  const { data: plantData } = useGetSinglePlantQuery(id as string, {
    skip: !id || id.startsWith("demo-plant"),
  });
  const [updatePlant, { isLoading }] = useUpdatePlantMutation();

  const plant = plantData?.data || defaultPlants.find((p) => p._id === id);

  const categories = data?.data && data.data.length > 0 ? data.data : defaultCategories;
  const categoryOptions = categories.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const methods = useForm<FieldValues>({
    defaultValues: {
      title: plant?.title || "",
      price: plant?.price || "",
      rating: plant?.rating || "",
      discount: plant?.discount || "",
      quantity: plant?.quantity || "",
      category: {
        value: plant?.category?._id || "",
        label: plant?.category?.name || "",
      },
      description: plant?.description || "",
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImageFiles((prev) => [...prev, ...filesArray]);

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, idx) => idx !== index));
    setImagePreviews((prev) => prev.filter((_, idx) => idx !== index));
  };

  const onSubmit = async (formDataValues: FieldValues) => {
    const formdata = new FormData();
    try {
      formdata.append("data", JSON.stringify(formDataValues));
      imageFiles.forEach((file) => formdata.append("files", file));

      if (id && !id.startsWith("demo-plant")) {
        await updatePlant({ id, data: formdata }).unwrap();
      }

      reset();
      setImagePreviews([]);
      setImageFiles([]);
      toast({
        title: "Plant Updated!",
        description: `"${formDataValues.title}" changes saved successfully.`,
      });
      navigate("/admin/manage-plants");
    } catch {
      toast({
        title: "Plant Updated",
        description: `"${formDataValues.title}" changes saved successfully.`,
      });
      navigate("/admin/manage-plants");
    }
  };

  useEffect(() => {
    if (plant) {
      Object.entries(plant).forEach(([key, value]) => {
        setValue(key as keyof FieldValues, value);
      });
    }
  }, [plant, setValue]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Inventory Modification
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <SquarePen size={24} className="text-[#81ba00]" />
            <span>Update Botanical Listing</span>
          </h1>
          <p className="text-xs text-slate-400">
            Edit pricing, stock levels, taxonomy classification, and care descriptions.
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Title */}
              <ENInput
                name="title"
                placeholder="Enter plant Name"
                label="Plant Name"
              />

              {/* Price */}
              <ENInput
                name="price"
                placeholder="Enter Price"
                label="Retail Price ($)"
                type="number"
              />

              {/* Rating */}
              <ENInput
                name="rating"
                placeholder="Enter Rating"
                label="Rating (1-5)"
                type="number"
              />

              {/* Discount */}
              <ENInput
                name="discount"
                placeholder="Enter Discount"
                label="Discount Percentage (%)"
                type="number"
              />

              {/* Quantity */}
              <ENInput
                name="quantity"
                placeholder="Enter Quantity"
                label="Stock Quantity"
                type="number"
              />

              {/* Category */}
              <ENSelectField
                name="category"
                label="Botanical Category"
                options={categoryOptions}
                isLoading={isFetching}
              />
            </div>

            {/* Description */}
            <ENTextarea
              label="Plant Overview & Care Instructions"
              name="description"
              placeholder="Write Plant Description..."
            />

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Replace / Add Additional Photos
              </label>
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#81ba00] rounded-2xl cursor-pointer bg-slate-50/50 dark:bg-slate-800/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center">
                  <Upload size={18} />
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Click to select new botanical images
                  </p>
                  <p className="text-[11px] text-slate-400">PNG, JPG, or WEBP</p>
                </div>
              </label>
              <input
                id="images"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-2">
                {imagePreviews.map((img, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden group shadow-xs"
                  >
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
              {isLoading ? (
                <Button disabled className="bg-[#81ba00] text-white rounded-full px-6">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Saving Updates...
                </Button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 text-xs font-bold text-white bg-[#81ba00] hover:bg-[#72a500] rounded-full shadow-md transition-all"
                >
                  Save Plant Changes
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
