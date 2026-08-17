import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  LogOut,
  Sparkles,
  Sun,
  Moon,
  Home,
  Store,
  Leaf,
  Grid,
  Info,
  PhoneCall,
  Package,
  PackagePlus,
  FolderTree,
  Receipt,
  Users,
  PenTool,
  BookOpen,
  ShoppingBag,
  Star,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useToast } from "../ui/use-toast";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { clearCart } from "@/redux/features/cartSlice";
import { useTheme } from "@/context/ThemeContext";
import { defaultCategories } from "@/assets/data/defaultCategories";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Logo from "./Logo";

const Navbar = () => {
  const { data } = useGetCategoriesQuery(null);
  const { theme, toggleTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const user = useAppSelector(selectCurrentUser);
  const { items } = useAppSelector((state) => state.cart);

  const categories = data?.data && data.data.length > 0 ? data.data : defaultCategories;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    if (items.length > 0) {
      dispatch(clearCart());
      toast({
        title: "Logged Out",
        description: "Your session and local cart have been cleared.",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
    }
    navigate("/");
  };

  const isActiveRoute = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100/80 dark:border-slate-800 shadow-xs sticky top-0 z-50 transition-colors duration-200">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 lg:px-8">
        {/* Modern Botanical Logo */}
        <NavLink to="/" className="group flex items-center">
          <Logo size="md" />
        </NavLink>

        {/* Desktop Navigation with Icons */}
        <ul className="hidden lg:flex items-center space-x-1">
          <li>
            <NavLink
              to="/"
              className={`navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 dark:hover:text-[#81ba00] ${
                isActiveRoute("/") && location.pathname === "/" ? "active text-[#81ba00] bg-[#81ba00]/10 dark:text-[#81ba00]" : ""
              }`}
            >
              <Home size={15} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={`navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 dark:hover:text-[#81ba00] ${
                isActiveRoute("/shop") ? "active text-[#81ba00] bg-[#81ba00]/10 dark:text-[#81ba00]" : ""
              }`}
            >
              <Store size={15} />
              <span>Plants</span>
            </NavLink>
          </li>
          <li className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 cursor-pointer">
                  <Grid size={15} />
                  <span>Categories</span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl border border-slate-100 dark:border-slate-800 rounded-2xl p-2 w-56">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-semibold px-3 py-1">
                  Plant Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/shop"
                    className="flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                  >
                    <Sparkles size={14} className="text-[#81ba00]" />
                    <span>All Plants</span>
                  </NavLink>
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category._id} asChild>
                    <NavLink
                      to={`/shop/category/${category.name}`}
                      className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer capitalize"
                    >
                      <Leaf size={13} className="text-[#81ba00]" />
                      <span>{category.name}</span>
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={`navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 dark:hover:text-[#81ba00] ${
                isActiveRoute("/blogs") || isActiveRoute("/blog")
                  ? "active text-[#81ba00] bg-[#81ba00]/10 dark:text-[#81ba00]"
                  : ""
              }`}
            >
              <BookOpen size={15} />
              <span>Blogs</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={`navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 dark:hover:text-[#81ba00] ${
                isActiveRoute("/about") ? "active text-[#81ba00] bg-[#81ba00]/10 dark:text-[#81ba00]" : ""
              }`}
            >
              <Info size={15} />
              <span>About Us</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={`navlink text-xs uppercase tracking-wider flex items-center gap-1.5 px-3 py-2 rounded-full transition-colors dark:text-slate-300 dark:hover:text-[#81ba00] ${
                isActiveRoute("/contact") ? "active text-[#81ba00] bg-[#81ba00]/10 dark:text-[#81ba00]" : ""
              }`}
            >
              <PhoneCall size={15} />
              <span>Contact</span>
            </NavLink>
          </li>
        </ul>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Dark Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#81ba00] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun size={19} className="text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={19} className="text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#81ba00] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Search size={19} />
          </button>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            aria-label="View Shopping Cart"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-[#81ba00] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <ShoppingCart size={19} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#81BA00] text-white text-[10px] sm:text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {items.length}
              </span>
            )}
          </NavLink>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:border-[#81ba00] bg-slate-50 dark:bg-slate-800/80 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : <User size={14} />}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 hidden sm:inline-block max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-slate-800 rounded-2xl p-2 w-64 max-h-[85vh] overflow-y-auto" align="end">
                <DropdownMenuLabel className="px-3 py-2.5">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
                  <p className="text-xs text-slate-400 font-normal truncate">{user.email}</p>
                  <span className="inline-block mt-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 bg-[#81ba00]/15 text-[#81ba00] rounded-full">
                    {user.role} Account
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-800" />

                {user.role === "ADMIN" ? (
                  <>
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Nursery Administration
                    </div>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/profile"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <UserCheck size={15} className="text-[#81ba00]" />
                        <span>Admin Profile</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/manage-plants"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <Package size={15} className="text-emerald-500" />
                        <span>Manage Inventory</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/create-product"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <PackagePlus size={15} className="text-[#81ba00]" />
                        <span>Add New Plant</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/manage-category"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <FolderTree size={15} className="text-amber-500" />
                        <span>Botanical Categories</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/view-transactions"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <Receipt size={15} className="text-sky-500" />
                        <span>Orders & Transactions</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/manage-users"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <Users size={15} className="text-purple-500" />
                        <span>User Management</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/publish-blog"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <PenTool size={15} className="text-[#81ba00]" />
                        <span>Publish Blog</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/admin/my-blogs"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <BookOpen size={15} className="text-teal-500" />
                        <span>My Published Blogs</span>
                      </NavLink>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Customer Hub
                    </div>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/customer/profile"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <UserCheck size={15} className="text-[#81ba00]" />
                        <span>Account Profile</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/customer/order-history"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <ShoppingBag size={15} className="text-emerald-500" />
                        <span>My Orders</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/customer/add-review"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <Star size={15} className="text-amber-500" />
                        <span>Write Plant Review</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/publish-blog"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <PenTool size={15} className="text-[#81ba00]" />
                        <span>Publish Plant Story</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/customer/my-blogs"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <BookOpen size={15} className="text-teal-500" />
                        <span>My Articles</span>
                      </NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink
                        to="/cart"
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-xl transition-colors cursor-pointer"
                      >
                        <ShoppingCart size={15} className="text-sky-500" />
                        <span>My Cart ({items.length})</span>
                      </NavLink>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator className="dark:bg-slate-800" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut size={15} />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/login">
              <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs font-semibold px-4 sm:px-5 py-2 transition-all shadow-sm">
                Login
              </Button>
            </NavLink>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Floating Search Bar */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-100 dark:border-slate-800 p-4 transition-all z-40">
          <form onSubmit={handleSearch} className="container mx-auto flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants by name or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-slate-200 dark:border-slate-700 focus:border-[#81ba00] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm"
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6 text-sm font-semibold"
            >
              Search
            </Button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation with Icons */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl px-4 py-6 space-y-4">
          <ul className="flex flex-col space-y-1 font-semibold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-200">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <Home size={16} className="text-[#81ba00]" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <Store size={16} className="text-[#81ba00]" />
                <span>Plants</span>
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex justify-between items-center px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Grid size={16} className="text-[#81ba00]" />
                  <span>Categories</span>
                </div>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180 text-[#81ba00]" : ""}`}
                />
              </button>
              {isCategoryOpen && (
                <ul className="pl-8 py-2 space-y-1 border-l-2 border-[#81ba00]/30 ml-6 my-1">
                  <li>
                    <NavLink
                      to="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-[#81ba00]"
                    >
                      <Sparkles size={14} className="text-[#81ba00]" />
                      <span>All Plants</span>
                    </NavLink>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <NavLink
                        to={`/shop/category/${category.name}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-slate-600 dark:text-slate-400 hover:text-[#81ba00] capitalize"
                      >
                        <Leaf size={13} className="text-[#81ba00]" />
                        <span>{category.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/blogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <BookOpen size={16} className="text-[#81ba00]" />
                <span>Blogs</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <Info size={16} className="text-[#81ba00]" />
                <span>About Us</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#81ba00]/10 hover:text-[#81ba00] transition-colors"
              >
                <PhoneCall size={16} className="text-[#81ba00]" />
                <span>Contact</span>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
