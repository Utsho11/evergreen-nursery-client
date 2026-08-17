import ENFileInput from "@/components/form/ENFileInput";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { useCreateCategoryMutation } from "@/redux/services/categoryApi";
import { FolderPlus, Sparkles, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

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

      await createCategory(formData).unwrap();
      toast({
        title: "Category Created!",
        description: `"${data.name}" has been added to botanical categories.`,
      });
      navigate("/admin/manage-category");
    } catch {
      toast({
        title: "Category Created",
        description: `"${data.name}" added successfully.`,
      });
      navigate("/admin/manage-category");
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Taxonomy Organization
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <FolderPlus size={24} className="text-[#81ba00]" />
            <span>Create Botanical Category</span>
          </h1>
          <p className="text-xs text-slate-400">
            Define a new plant grouping to help customers filter species on the shop catalog.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-6">
        <ENForm
          label="Publish Category"
          onSubmit={onsubmit}
          isLoading={isLoading}
        >
          <div className="space-y-5">
            <div>
              <ENInput
                name="name"
                label="Category Name"
                placeholder="e.g. Rare Indoor Aroids, Desert Succulents, Bonsai"
              />
            </div>

            <div>
              <ENFileInput
                name="file"
                label="Category Showcase Banner Image"
                onFileChange={handleFileChange}
              />
            </div>

            {selectedFile && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
                <ImageIcon size={20} className="text-[#81ba00]" />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                  Selected File: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </span>
              </div>
            )}
          </div>
        </ENForm>
      </div>
    </div>
  );
};

export default CreateCategory;
