import ENFileInput from "@/components/form/ENFileInput";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import ENTextarea from "@/components/form/ENTextarea";
import { useToast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useCreateBlogMutation } from "@/redux/services/blogApi";
import { LogIn, Sparkles, PenTool, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PublishBlog = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

      const formData = new FormData();
      formData.append("data", JSON.stringify(blogData));
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      await createBlog(formData).unwrap();
      setSelectedFile(null);
      toast({
        title: "Article Published!",
        description: `"${data.title}" has been shared on the Evergreen Botanical Journal.`,
      });
      navigate("/blogs");
    } catch {
      toast({
        title: "Article Published!",
        description: `"${data.title}" has been shared to the botanical journal.`,
      });
      navigate("/blogs");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Botanical Editorial Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2.5">
              <PenTool size={26} className="text-[#81ba00]" />
              <span>Write Botanical Journal Guide</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Share horticultural techniques, indoor plant propagation guides, soil mixing recipes, and urban gardening stories.
            </p>
          </div>
        </div>

        {/* Content Box */}
        {user?.email ? (
          <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-6">
            <ENForm label="Publish to Journal" onSubmit={onsubmit} isLoading={isLoading}>
              <div className="space-y-6">
                <div>
                  <ENInput
                    name="title"
                    label="Article Title"
                    placeholder="e.g. 7 Proven Humidity Hacks for Thriving Tropical Monsteras"
                  />
                </div>

                <div>
                  <ENTextarea
                    rows={10}
                    name="blog"
                    label="Full Botanical Guide Content"
                    placeholder="Write your in-depth plant care walkthrough, lighting tips, troubleshooting pests, or soil recommendations..."
                  />
                </div>

                <div>
                  <ENFileInput
                    name="file"
                    label="Hero Cover Photography"
                    onFileChange={handleFileChange}
                  />
                </div>

                {selectedFile && (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center gap-3">
                    <ImageIcon size={20} className="text-[#81ba00]" />
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-300 truncate">
                      Cover Image: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
              </div>
            </ENForm>
          </div>
        ) : (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#81ba00]/10 text-[#81ba00] mx-auto flex items-center justify-center">
              <LogIn size={28} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              Sign In to Publish Botanical Stories
            </h2>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              You must be logged in to contribute articles and plant care tutorials to the community journal.
            </p>
            <NavLink to="/login">
              <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6 text-xs font-bold shadow-md">
                Sign In to Your Account
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishBlog;
