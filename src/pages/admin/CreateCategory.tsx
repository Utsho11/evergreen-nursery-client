import banner from "@/assets/bg/footer-parallax.webp";
import ENFileInput from "@/components/form/ENFileInput";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import { useToast } from "@/components/ui/use-toast";
import { useCreateCategoryMutation } from "@/redux/services/categoryApi";
import { useState } from "react";
import { FieldValues } from "react-hook-form";

const CreateCategory = () => {
  const { toast } = useToast();
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onsubmit = async (data: FieldValues) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await createCategory(formData);
      toast({
        title: "Success",
        description: "Category created successfully!",
      });
    } catch {
      toast({ title: "Error", description: "Failed to create category!" });
    }
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
          Create Category
        </h1>
      </div>
      <div className="flex my-16 sm:my-28 mx-8">
        <div className="border border-gray-300 p-8 sm:p-16 mx-auto">
          <ENForm
            label="Create Category"
            onSubmit={onsubmit}
            isLoading={isLoading}
          >
            <ENInput
              name="name"
              label="Category"
              placeholder="Enter Category Name"
            />
            <ENFileInput
              name="file"
              label="Insert Image"
              onFileChange={handleFileChange}
            />
          </ENForm>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
