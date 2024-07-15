import { useGetCategoriesQuery } from "@/redux/features/plantApi";
import { NavLink } from "react-router-dom";

interface ShopSideBarProps {
  category: string | null;
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: "asc" | "desc") => void;
}

const ShopSideBar = ({
  category,
  sortOrder,
  setSortOrder,
}: ShopSideBarProps) => {
  const { data: categories } = useGetCategoriesQuery();

  return (
    <div className="rounded-xl border-2 border-slate-600 sticky top-52">
      <div className="p-2 border-b-2 border-slate-600">
        <h1 className="text-xl font-medium">
          Category: {category ? <span>{category}</span> : <span>ALL</span>}
        </h1>
      </div>
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
              checked={sortOrder === "asc"}
              onChange={() => setSortOrder("asc")}
              className="form-checkbox custom-checkbox h-4 w-4 text-[#81ba00]"
            />
            <span className="ml-2 hover:text-[#81ba00]">Low to High</span>
          </label>
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              name="sortOrder"
              value="desc"
              checked={sortOrder === "desc"}
              onChange={() => setSortOrder("desc")}
              className="form-checkbox h-4 w-4 bg-[#81ba00]"
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
          <li className="hover:text-[#81ba00]">
            <NavLink to="/shop">Default</NavLink>
          </li>
          {categories?.map((item, index) => (
            <li key={index} className="hover:text-[#81ba00]">
              <NavLink to={`category/${item.name}`}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopSideBar;
