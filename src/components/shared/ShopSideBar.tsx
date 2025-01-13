import { TCategory } from "@/types";
import { NavLink } from "react-router-dom";

interface ShopSideBarProps {
  categories: TCategory[];
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sortOrder: string | null) => void;
  selectedCategory: string | null;
}

const ShopSideBar: React.FC<ShopSideBarProps> = ({
  onCategoryChange,
  onSortChange,
  categories,
  selectedCategory,
}) => {
  return (
    <div className="rounded-xl border-2 border-slate-600 sticky top-52">
      <div>
        <h1 className="font-semibold p-2 border-b-2 border-slate-600">
          Sort By Price
        </h1>
        <div className="mt-5 space-y-2 p-4">
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              name="sortOrder"
              value="asc"
              className="form-checkbox custom-checkbox h-4 w-4 text-[#81ba00]"
              onChange={() => onSortChange("asc")}
            />
            <span className="ml-2 hover:text-[#81ba00]">Low to High</span>
          </label>
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              className="form-checkbox h-4 w-4"
              onChange={() => onSortChange("desc")}
            />
            <span className="ml-2 hover:text-[#81ba00]">High to Low</span>
          </label>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="font-semibold border-y-2 border-slate-600 p-2">
          Filter By Category
        </h1>
        <ul className="grid my-5 font-medium text-sm space-y-3 p-4">
          <li
            onClick={() => onCategoryChange(null)}
            className={`hover:text-[#81ba00] ${
              selectedCategory === null ? "text-[#81BA00]" : ""
            }`}
          >
            <NavLink to="/shop">Default</NavLink>
          </li>
          {categories?.map((item, index) => (
            <li
              key={index}
              className={`hover:text-[#81ba00] ${
                selectedCategory === item._id ? "text-[#81BA00]" : ""
              }`}
              onClick={() => onCategoryChange(item._id)}
            >
              <NavLink to={`category/${item.name}`}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopSideBar;
