import {
  FileText,
  LogOut,
  Menu,
  NotebookPen,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, Home, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useToast } from "@/components/ui/use-toast";
import { clearCart } from "@/redux/features/cartSlice";

const links = [
  { name: "Home", icon: <Home size={20} />, path: "/" },
  { name: "Profile", icon: <User size={20} />, path: "/customer/profile" },
  { name: "My Cart", icon: <ShoppingBag size={20} />, path: "/cart" },
  { name: "Reviews", icon: <Star size={20} />, path: "/customer/add-review" },
  {
    name: "Orders",
    icon: <ShoppingCart size={20} />,
    path: "/customer/order-history",
  },
  {
    name: "Write Blog",
    icon: <NotebookPen size={20} />,
    path: "/publish-blog",
  },
  {
    name: "My Blogs",
    icon: <FileText size={20} />,
    path: "/customer/my-blogs",
  },
];

const CustomerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items } = useAppSelector((state) => state.cart);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    if (items.length > 0) {
      alert("Cart will be deleted if you log out!");
    }
    dispatch(clearCart());
    toast({
      title: "Successfully Log out.",
      description: "Please visit again.",
    });
    navigate("/");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#1B1B1B] text-white w-64 lg:w-64 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } fixed lg:relative z-40`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Customer</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {links.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors rounded"
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="my-16 left-0 w-full px-4">
          <button
            onClick={() => handleLogout()}
            className="w-full flex items-center px-4 py-2 text-sm bg-red-600 hover:bg-red-700 rounded text-white"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="mx-auto">
          <div>
            <Outlet />
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`${
          isSidebarOpen ? "hidden" : "block"
        } lg:hidden fixed top-24 left-4 z-50 bg-gray-800 text-white p-2 rounded shadow-md`}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default CustomerDashboard;
