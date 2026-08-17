import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useLoginMutation } from "@/redux/services/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { Loader2, Lock, Mail, Eye, EyeOff, Shield, User, Sparkles } from "lucide-react";
import Logo from "@/components/shared/Logo";

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

      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast({
        title: "Successfully Logged In",
        description: `Welcome back to Evergreen Nursery!`,
      });

      navigate("/");
    } catch {
      toast({
        title: "Authentication Failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  const handleDemoLogin = (role: "admin" | "customer") => {
    const credentials = {
      admin: { email: "admin@gmail.com", password: "admin@123" },
      customer: { email: "user@gmail.com", password: "123456" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
    toast({
      title: `Demo ${role.toUpperCase()} Credentials Applied`,
      description: "Click 'Sign In to Account' to enter.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center transition-colors duration-200">
      <div className="mx-auto w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <NavLink to="/">
            <Logo size="lg" />
          </NavLink>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
              Welcome Back
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to manage your botanical orders, wishlist, and garden care.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
          {/* Demo User Fast Fill */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} className="text-[#81ba00]" />
              Quick Demo Logins:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 shadow-2xs transition-all"
              >
                <Shield size={13} />
                <span>Admin Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("customer")}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 shadow-2xs transition-all"
              >
                <User size={13} />
                <span>Customer Demo</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-[#81ba00] transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-hidden focus:border-[#81ba00] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              {isLoading ? (
                <Button disabled className="w-full bg-[#81ba00] text-white rounded-full py-5 text-xs font-bold">
                  <Loader2 className="animate-spin mr-2" size={16} />
                  Verifying Credentials...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full rounded-full text-xs sm:text-sm font-bold py-5 bg-[#81ba00] hover:bg-[#70a400] text-white shadow-md transition-all"
                >
                  Sign In to Account
                </Button>
              )}
            </div>
          </form>

          {/* Sign-Up Link */}
          <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Don't have an account yet?{" "}
              <NavLink to="/register" className="text-[#81ba00] hover:underline font-bold">
                Create Account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
