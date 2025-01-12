import { useState } from "react";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useToast } from "../ui/use-toast";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { clearCart } from "@/redux/features/cartSlice";

const Navbar = () => {
  const { data } = useGetCategoriesQuery(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = useAppSelector(selectCurrentUser);
  const { items } = useAppSelector((state) => state.cart);

  const categories = data?.data || [];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?keyword=${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

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
    <nav className="w-full bg-transparent shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 lg:px-8">
        {/* Logo */}
        <div className="text-3xl font-bold text-[#81ba00]">
          <NavLink to="/">
            <img src={logo} className="h-[50px]" alt="" />
          </NavLink>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <NavLink to="/shop">
              <Button className="navlink">Shop</Button>
            </NavLink>
          </li>
          <li className="relative group">
            <Button className="navlink">Category</Button>
            {/* Mega Menu */}
            <div className="absolute top-12 left-0 w-64 bg-white shadow-md border border-gray-200 p-4 hidden group-hover:block">
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <NavLink to={`shop/category/${category._id}`}>
                      <Button className="text-gray-700 w-full text-left hover:bg-gray-100">
                        {category.name}
                      </Button>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/blogs">
              <Button className="navlink">Blog</Button>
            </NavLink>
          </li>
        </ul>

        {/* Right Section: Icons */}
        <div className="flex items-center space-x-4 relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className=" hover:text-[#81ba00]"
          >
            <Search size={20} />
          </button>
          <button className=" hover:text-[#81ba00] flex items-center justify-center gap-1">
            <NavLink to="/cart">
              <ShoppingCart size={20} />
            </NavLink>
            <span className="bg-[#81BA00] w-5 h-5 flex items-center justify-center text-white text-sm rounded-full">
              {items.length || 0}
            </span>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className=" hover:text-[#81ba00] flex items-center"
              >
                <User size={20} />
                {isUserDropdownOpen ? (
                  <ChevronUp size={16} className="ml-1" />
                ) : (
                  <ChevronDown size={16} className="ml-1" />
                )}
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-md rounded-md">
                  <ul className="py-2">
                    <li>
                      <NavLink
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/orders"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login">
              <Button className="navlink">Login</Button>
            </NavLink>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className=" lg:hidden hover:text-[#81ba00]"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Box */}
      {isSearchOpen && (
        <div className="absolute inset-0 bg-white shadow-lg z-40 flex items-center p-4">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-grow text-lg text-gray-800 px-4 py-2"
          />
          <button
            onClick={handleSearch}
            className="text-gray-800 hover:text-[#81ba00] mx-4"
          >
            Search
          </button>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-gray-800 hover:text-[#81ba00]"
          >
            <X size={24} />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden shadow-md">
          <ul className="flex flex-col space-y-2 py-4 px-4">
            <li>
              <NavLink to="/shop">
                <Button className=" w-full text-center">Shop</Button>
              </NavLink>
            </li>
            <li>
              <div className="flex justify-between items-center">
                <Button
                  className=" w-full text-center"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  Category
                </Button>
                <ChevronDown size={20} className=" cursor-pointer" />
              </div>
              {/* Mobile Mega Menu */}
              {isCategoryOpen && (
                <div className="pl-4">
                  <ul className="space-y-2">
                    {categories.map((category, index) => (
                      <li className="text-gray-300 text-end" key={index}>
                        <NavLink
                          to={`shop/category/${category._id}`}
                          className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {category.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li>
              <NavLink to="/blogs">
                <Button className=" w-full text-end">Blog</Button>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
