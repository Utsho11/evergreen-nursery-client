import { TCategory } from "@/types";
import { ArrowDownAZ, ArrowUp10, ArrowDown10, Layers, RotateCcw, Sparkles } from "lucide-react";

interface ShopSideBarProps {
  categories: TCategory[];
  onCategoryChange: (category: string | null) => void;
  onSortChange: (sortOrder: string | null) => void;
  selectedCategory: string | null;
  selectedSort: string | null;
  onReset: () => void;
}

const ShopSideBar: React.FC<ShopSideBarProps> = ({
  onCategoryChange,
  onSortChange,
  categories,
  selectedCategory,
  selectedSort,
  onReset,
}) => {
  const hasActiveFilters = selectedCategory !== null || selectedSort !== null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-6 sticky top-24">
      {/* Sidebar Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Layers size={18} className="text-[#81ba00]" />
          <span>Filters</span>
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Sort By Price */}
      <div className="space-y-3">
        <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Sort Products
        </h3>
        <div className="space-y-1.5">
          <button
            onClick={() => onSortChange(null)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              selectedSort === null
                ? "bg-[#81ba00] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <ArrowDownAZ size={14} />
              Featured / Default
            </span>
          </button>

          <button
            onClick={() => onSortChange("asc")}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              selectedSort === "asc"
                ? "bg-[#81ba00] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <ArrowUp10 size={14} />
              Price: Low to High
            </span>
          </button>

          <button
            onClick={() => onSortChange("desc")}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              selectedSort === "desc"
                ? "bg-[#81ba00] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <ArrowDown10 size={14} />
              Price: High to Low
            </span>
          </button>
        </div>
      </div>

      {/* Filter By Category */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400">
          Categories
        </h3>
        <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
          <button
            onClick={() => onCategoryChange(null)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
              selectedCategory === null
                ? "bg-[#81ba00]/15 text-[#81ba00] font-bold"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2">
              <Sparkles size={13} />
              All Categories
            </span>
          </button>

          {categories?.map((item) => (
            <button
              key={item._id}
              onClick={() => onCategoryChange(item._id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition-all ${
                selectedCategory === item._id || selectedCategory === item.name
                  ? "bg-[#81ba00]/15 text-[#81ba00] font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span className="capitalize text-left truncate">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSideBar;
