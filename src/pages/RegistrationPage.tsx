import ENForm from "@/components/form/ENForm";
import banner from "../assets/bg/footer-parallax.webp";
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

const RegistrationPage = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: FieldValues) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
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
        title: "Successfully loged in.",
        description: "Welcome to evergreen nursery",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
      });
    }
  };

  return (
    <div className="w-full">
      <div
        className="flex items-center justify-center sm:min-h-[40vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Create Account
        </h1>
      </div>
      <div className="mx-auto w-full max-w-md sm:max-w-lg p-6 border shadow-md rounded-lg bg-white mb-8">
        <div className="">
          <h1 className="text-center text-3xl font-semibold mb-6">Register</h1>
        </div>
        <div className="">
          <ENForm
            isLoading={isLoading}
            onSubmit={onSubmit}
            label="Create Account"
          >
            <ENInput
              name="name"
              type="text"
              label="Fullname"
              placeholder="Enter fullname"
            />
            <ENInput
              name="email"
              type="email"
              label="Email"
              placeholder="Enter email"
            />
            <div className="space-y-4 sm:space-y-0 sm:flex gap-3">
              <ENInput
                name="mobileNumber"
                label="Mobile Number"
                type="text"
                placeholder="Enter mobile number"
              />
              <ENInput
                name="location"
                label="Location"
                type="text"
                placeholder="Enter location"
              />
            </div>
            <ENFileInput
              name="file"
              label="Insert ProfilePhoto"
              accept="image/*"
              onFileChange={handleFileChange}
            />
            <ENInput
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="Enter password"
            />
            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                onClick={togglePasswordVisibility}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm">Show Password</span>
            </div>
          </ENForm>
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <NavLink to="/login" className="text-blue-500 font-medium">
              Login now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
