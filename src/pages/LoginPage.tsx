import { Button } from "@/components/ui/button";
import banner from "../assets/bg/footer-parallax.webp";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/redux/services/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userInfo = {
        email: email,
        password: password,
      };

      console.log(userInfo);

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        title: "Successfully loged in.",
        description: "Welcome to evergreen nursery",
      });

      navigate("/");
    } catch {
      toast({
        title: "Error",
        description: "Invalid email or password",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = (role: "admin" | "customer") => {
    const credentials = {
      admin: { email: "admin@gmail.com", password: "admin@123" },
      customer: { email: "user@gmail.com", password: "123456" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="flex items-center justify-center sm:min-h-[40vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">Account</h1>
      </div>

      {/* Login Section */}
      <div className="mx-auto w-full max-w-md sm:max-w-lg p-6 border shadow-md rounded-lg bg-white mb-8">
        {/* Login Heading */}
        <h1 className="text-center text-3xl font-semibold mb-6">Login</h1>

        {/* Demo User Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <h2 className="text-base font-medium">Demo User:</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleDemoLogin("admin")}
              className="flex justify-center gap-2 items-center mx-auto text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#81BA00] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              Admin
            </button>
            <button
              onClick={() => handleDemoLogin("customer")}
              className="flex justify-center gap-2 items-center mx-auto text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#81BA00] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
            >
              Customer
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="space-y-2">
            <label htmlFor="email" className="label font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full border p-2"
              required
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="label font-medium">
              Password
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full border p-2"
              required
            />
          </div>

          {/* Show Password Checkbox */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              onClick={togglePasswordVisibility}
              className="checkbox checkbox-primary"
            />
            <span className="text-sm">Show Password</span>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            {isLoading ? (
              <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="rounded-full text-center text-lg px-8 py-4 bg-[#81BA00] hover:bg-[#6ea000] text-white mt-4"
              >
                Login
              </Button>
            )}
          </div>
        </form>

        {/* Sign-Up Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-blue-500 font-medium">
            Sign up now
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
