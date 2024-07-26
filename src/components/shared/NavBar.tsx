import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

import logo from "@/assets/main-logo.png";
import { useGetCategoriesQuery } from "@/redux/features/plantApi";
import { Button } from "../ui/button";
import CartIcon from "@/assets/icons/CartIcon";
import { useAppSelector } from "@/redux/hooks";
import SearchBar from "./SearchBar";

// const categories = [
//   {
//     name: "A",
//   },
// ];

const NavBar = () => {
  const { items } = useAppSelector((state) => state.cart);

  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="grid grid-cols-12 px-8 py-4">
      {/* Logo and Mobile Menu Toggle */}
      <div className="col-span-3 flex justify-start items-center ">
        {/* Logo */}
        <div className="text-xl font-bold">
          <NavLink to="/">
            <div className="relative">
              <h1 className="absolute bottom-[1.6rem] font-serif">
                Ever
                <span className="text-[#42b92e]"> reeen</span>
              </h1>
              <img src={logo} alt="" className="w-[112px] h-[43px]" />
            </div>
          </NavLink>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      <div className="col-span-6 flex justify-center items-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-3">
            <NavigationMenuItem className="navlink">
              <NavLink to="/" className="">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Home
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="navlink">
              <NavLink to="/shop">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Shop
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="navlink">
              <NavigationMenuTrigger
                className={`${navigationMenuTriggerStyle()}`}
              >
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid p-6 w-[280px] text-end bg-[#1b1b1b] text-white font-medium text-sm space-y-3">
                  {categories?.map((item, index) => (
                    <li key={index} className="hover:text-[#81ba00]">
                      <NavigationMenuLink asChild>
                        <NavLink to={`shop/category/${item.name}`}>
                          {item.name}
                        </NavLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="navlink">
              <NavigationMenuTrigger
                className={`${navigationMenuTriggerStyle()}`}
              >
                More
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col justify-center">
                <ul className="p-6 w-[450px] bg-[#1b1b1b] text-white font-medium text-sm text-end space-y-3">
                  <li className="hover:text-[#81ba00]">
                    <NavigationMenuLink asChild>
                      <NavLink to="/manageProducts">Manage Plants</NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li className="hover:text-[#81ba00]">
                    <NavigationMenuLink asChild>
                      <NavLink to="/cart">Manage Cart</NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li className="hover:text-[#81ba00]">
                    <NavigationMenuLink asChild>
                      <NavLink to="/insertProduct">Add Plant</NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li className="hover:text-[#81ba00]">
                    <NavigationMenuLink asChild>
                      <NavLink to="/category/addCategory">
                        Manage Category
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem className="navlink">
              <NavLink to="/blogs">
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()}`}
                >
                  Blogs
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Cart Section (Visible on large screens) */}
      <div className="relative col-span-3 gap-2 flex justify-end items-center">
        <SearchBar />
        <NavLink to="/cart" className="flex items-center">
          <Button className="bg-transparent hover:bg-[#81ba00]">
            <CartIcon />
          </Button>
          {items.length > 0 ? (
            <div className="bg-[#81ba00] absolute right-6 top-6  h-5 w-5 rounded-full">
              <p className="text-sm absolute left-[.35rem] bottom-0">
                {items.length}
              </p>
            </div>
          ) : (
            ""
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
