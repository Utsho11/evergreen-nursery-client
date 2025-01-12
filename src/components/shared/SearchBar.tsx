import SearchIcon from "@/assets/icons/SearchIcon";
import React, { useState } from "react";
import { Button } from "../ui/button";
// import { useSearchPlantsQuery } from "@/redux/features/plantApi";
// import { NavLink } from "react-router-dom";

const SearchBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const [searchTerm, setSearchTerm] = useState<string>("");

  // const { data: plants } = useSearchPlantsQuery(
  //   { title: searchTerm },
  //   { skip: !searchTerm }
  // );

  const handleIconClick = () => {
    setIsVisible(!isVisible);
  };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSearchSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setIsVisible(false);
  //   console.log("Searching for:", searchTerm);
  // };

  return (
    <div className="relative flex w-[300px] justify-end items-center shadow-md rounded-lg">
      {!isVisible && (
        <Button onClick={handleIconClick} className="hover:bg-[#81ba00]">
          <SearchIcon />
        </Button>
      )}
      {/* <div className="flex flex-col relative">
        {isVisible && (
          <form className="flex items-center" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search Plants"
              className="p-2 text-sm border rounded-lg mr-2 text-black"
            />
            <button type="submit" className="">
              <SearchIcon />
            </button>
          </form>
        )}
        {plants && isVisible && (
          <div className="absolute top-full right-0 mt-2 w-full bg-[#1b1b1b] z-10 rounded-lg shadow-lg">
            <ul className="p-2">
              {plants.map((item, index) => (
                <NavLink to={`/shop/${item._id}`} key={index}>
                  <li className="hover:text-[#81ba00] p-1 text-white">
                    {item.title}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default SearchBar;
