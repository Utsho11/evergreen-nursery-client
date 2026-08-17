import ENForm from "@/components/form/ENForm";
import { FieldValues } from "react-hook-form";
import ENInput from "@/components/form/ENInput";
import ENFileInput from "@/components/form/ENFileInput";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "@/redux/services/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/shared/Logo";
import { Image as ImageIcon } from "lucide-react";

const RegistrationPage = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!selectedFile) {
      toast({
        title: "Profile photo required",
        description: "Please select an image file to upload as your profile photo.",
      });
      return;
    }
    const formData = new FormData();
    try {
      formData.append("data", JSON.stringify(data));
      formData.append("file", selectedFile);

      const res = await register(formData).unwrap();
      const user = verifyToken(res.data.accessToken);

      if (!user) {
        throw new Error("User is not valid.");
      }

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        title: "Registration Successful!",
        description: "Welcome to Evergreen Botanical Nursery community.",
      });

      navigate("/");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast({
        title: "Registration Failed",
        description:
          err?.data?.message || "Could not register account. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center transition-colors duration-200">
      <div className="mx-auto w-full max-w-lg space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <NavLink to="/">
            <Logo size="lg" />
          </NavLink>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
              Create Your Account
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Join our botanical garden community for discounts, plant tracking, and reviews.
            </p>
          </div>
        </div>

        {/* Registration Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          <ENForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            label="Complete Registration"
          >
            <div className="space-y-4">
              <ENInput
                name="name"
                type="text"
                label="Full Name"
                placeholder="e.g. Julian Hayes"
              />

              <ENInput
                name="email"
                type="email"
                label="Email Address"
                placeholder="e.g. julian@example.com"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ENInput
                  name="mobileNumber"
                  label="Contact Phone"
                  type="text"
                  placeholder="+1 (555) 019-2834"
                />
                <ENInput
                  name="location"
                  label="Shipping Address / City"
                  type="text"
                  placeholder="Green Valley, CA"
                />
              </div>

              <div>
                <ENFileInput
                  name="file"
                  label="Profile Picture Avatar"
                  accept="image/*"
                  onFileChange={handleFileChange}
                />
                {selectedFile && (
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
                    <ImageIcon size={12} />
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>

              <ENInput
                name="password"
                type="password"
                label="Account Password"
                placeholder="Choose a strong password"
              />
            </div>
          </ENForm>

          {/* Login Link */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <NavLink to="/login" className="text-[#81ba00] hover:underline font-bold">
                Sign In
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
