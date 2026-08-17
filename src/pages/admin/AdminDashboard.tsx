import { useState } from "react";
import {
  Home,
  LogOut,
  Menu,
  X,
  FolderPlus,
  PackagePlus,
  Users,
  Layers,
  Leaf,
  CreditCard,
  NotebookPen,
  FileText,
  Sun,
  Moon,
  ShieldCheck,
} from "lucide-react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { name: "Dashboard Overview", icon: <Home size={18} />, path: "/admin/profile" },
  { name: "Manage Plants", icon: <Leaf size={18} />, path: "/admin/manage-plants" },
  { name: "Add New Plant", icon: <PackagePlus size={18} />, path: "/admin/create-product" },
  { name: "Manage Categories", icon: <Layers size={18} />, path: "/admin/manage-category" },
  { name: "Add Category", icon: <FolderPlus size={18} />, path: "/admin/create-category" },
  { name: "Manage Users", icon: <Users size={18} />, path: "/admin/manage-users" },
  { name: "Transactions", icon: <CreditCard size={18} />, path: "/admin/view-transactions" },
  { name: "Write Article", icon: <NotebookPen size={18} />, path: "/publish-blog" },
  { name: "My Articles", icon: <FileText size={18} />, path: "/admin/my-blogs" },
];

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged Out",
      description: "You have securely logged out of the Admin portal.",
    });
    navigate("/");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Sidebar Backdrop on Mobile */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand & Admin Badge */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#81ba00] text-white flex items-center justify-center shadow-md">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                Evergreen Admin
              </h2>
              <span className="text-[11px] font-bold uppercase text-[#81ba00] tracking-wider">
                Control Portal
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {links.map((link, index) => {
            const active = isActive(link.path);
            return (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  active
                    ? "bg-[#81ba00] text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <span className={active ? "text-white" : "text-[#81ba00]"}>{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name ? user.name[0].toUpperCase() : "A"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                  {user?.name || "Administrator"}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-slate-500 hover:text-[#81ba00]"
              title="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className="flex-1 py-2 px-3 text-center text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
            >
              View Site
            </NavLink>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-xl transition-colors"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 px-4 lg:px-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu size={20} />
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === "dark" ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>
            <NavLink
              to="/"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-[#81ba00] hover:underline"
            >
              Return to Store →
            </NavLink>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
