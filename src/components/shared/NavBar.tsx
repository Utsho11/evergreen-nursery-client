import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  PanelLeftDashed,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useToast } from "../ui/use-toast";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { clearCart } from "@/redux/features/cartSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const { data } = useGetCategoriesQuery(null);
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

  const categories = data?.data || [];

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
    <nav className="w-full bg-white/95 backdrop-blur-md border-b border-gray-100/80 shadow-xs sticky top-0 z-50 transition-all">
      <div className="container mx-auto flex justify-between items-center py-3.5 px-4 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            className="h-[44px] sm:h-[48px] object-contain group-hover:scale-105 transition-transform duration-300"
            alt="Evergreen Nursery Logo"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-1">
          <li>
            <NavLink
              to="/"
              className={`navlink text-sm uppercase tracking-wide ${
                isActiveRoute("/") && location.pathname === "/" ? "active text-[#81ba00]" : ""
              }`}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={`navlink text-sm uppercase tracking-wide ${
                isActiveRoute("/shop") ? "active text-[#81ba00]" : ""
              }`}
            >
              Plants
            </NavLink>
          </li>
          <li className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="navlink text-sm uppercase tracking-wide cursor-pointer flex items-center gap-1">
                  <span>Categories</span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 rounded-xl p-2 w-56">
                <DropdownMenuLabel className="text-xs uppercase tracking-wider text-slate-400 font-semibold px-3 py-1">
                  Plant Categories
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink
                    to="/shop"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-lg transition-colors cursor-pointer"
                  >
                    <Sparkles size={16} className="text-[#81ba00]" />
                    <span>All Plants</span>
                  </NavLink>
                </DropdownMenuItem>
                {categories.map((category) => (
                  <DropdownMenuItem key={category._id} asChild>
                    <NavLink
                      to={`/shop/category/${category.name}`}
                      className="flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-lg transition-colors cursor-pointer capitalize"
                    >
                      {category.name}
                    </NavLink>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <NavLink
              to="/blogs"
              className={`navlink text-sm uppercase tracking-wide ${
                isActiveRoute("/blogs") || isActiveRoute("/blog")
                  ? "active text-[#81ba00]"
                  : ""
              }`}
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={`navlink text-sm uppercase tracking-wide ${
                isActiveRoute("/about") ? "active text-[#81ba00]" : ""
              }`}
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={`navlink text-sm uppercase tracking-wide ${
                isActiveRoute("/contact") ? "active text-[#81ba00]" : ""
              }`}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-3">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-[#81ba00] hover:bg-slate-100 transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Cart Icon */}
          <NavLink
            to="/cart"
            aria-label="View Shopping Cart"
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-[#81ba00] hover:bg-slate-100 transition-colors relative"
          >
            <ShoppingCart size={20} />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#81BA00] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm animate-pulse">
                {items.length}
              </span>
            )}
          </NavLink>

          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-[#81ba00] bg-slate-50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs">
                    {user.name ? user.name[0].toUpperCase() : <User size={14} />}
                  </div>
                  <span className="text-xs font-semibold text-slate-700 hidden sm:inline-block max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-xl border border-slate-100 rounded-xl p-2 w-52" align="end">
                <DropdownMenuLabel className="px-3 py-2">
                  <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                  <p className="text-xs text-slate-400 font-normal truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#81ba00]/15 text-[#81ba00] rounded-full">
                    {user.role}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <NavLink
                    to={user.role === "ADMIN" ? "/admin/profile" : "/customer/profile"}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-[#81ba00]/10 hover:text-[#81ba00] rounded-lg transition-colors cursor-pointer"
                  >
                    <PanelLeftDashed size={16} />
                    <span>Dashboard</span>
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavLink to="/login">
              <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs font-semibold px-5 py-2 transition-all shadow-sm">
                Login
              </Button>
            </NavLink>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Floating Search Bar */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full bg-white/95 backdrop-blur-md shadow-lg border-b border-slate-100 p-4 transition-all z-40">
          <form onSubmit={handleSearch} className="container mx-auto flex items-center gap-3">
            <div className="relative flex-grow">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search plants by name or description..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border-slate-200 focus:border-[#81ba00] bg-slate-50 focus:bg-white text-sm"
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
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white shadow-xl px-4 py-6 space-y-4">
          <ul className="flex flex-col space-y-1 font-medium text-slate-700">
            <li>
              <NavLink
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                Plants
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex justify-between items-center px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                <span>Categories</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180 text-[#81ba00]" : ""}`}
                />
              </button>
              {isCategoryOpen && (
                <ul className="pl-6 py-2 space-y-1 border-l-2 border-[#81ba00]/30 ml-4 my-1">
                  <li>
                    <NavLink
                      to="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-1.5 text-sm text-slate-600 hover:text-[#81ba00]"
                    >
                      All Plants
                    </NavLink>
                  </li>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <NavLink
                        to={`/shop/category/${category.name}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-3 py-1.5 text-sm text-slate-600 hover:text-[#81ba00] capitalize"
                      >
                        {category.name}
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
                className="block px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg hover:bg-[#81ba00]/10 hover:text-[#81ba00]"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
