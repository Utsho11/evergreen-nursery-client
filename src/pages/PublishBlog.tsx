import banner from "@/assets/bg/footer-parallax.webp";
import ENFileInput from "@/components/form/ENFileInput";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import ENTextarea from "@/components/form/ENTextarea";
import { useToast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useCreateBlogMutation } from "@/redux/services/blogApi";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";
const PublishBlog = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const user = useAppSelector(selectCurrentUser);

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const onsubmit = async (data: FieldValues) => {
    try {
      const blogData = {
        ...data,
        author: user?._id,
      };
      // console.log(blogData);

      const formData = new FormData();
      formData.append("data", JSON.stringify(blogData));
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await createBlog(formData);
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
          Publish Blog
        </h1>
      </div>
      <div className="flex my-16 sm:my-28  mx-8">
        {user?.email ? (
          <div className="border border-gray-300 p-8 lg:min-w-[60rem] sm:p-16 mx-auto">
            <ENForm label="Publish" onSubmit={onsubmit} isLoading={isLoading}>
              <ENInput
                name="title"
                label="Blog"
                placeholder="Enter Category Name"
              />
              <ENTextarea
                rows={8}
                name="blog"
                label="Write blog"
                placeholder="Write your blog"
              />
              <ENFileInput
                name="file"
                label="Insert Image"
                onFileChange={handleFileChange}
              />
            </ENForm>
          </div>
        ) : (
          <div className="flex mx-auto flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">
              Please Login/Register Account to Write Blogs
            </h1>
            <NavLink to="/login" className="no-underline">
              <button className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 hover:scale-105 transition-transform">
                <LogIn className="w-5 h-5" /> Login
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishBlog;
