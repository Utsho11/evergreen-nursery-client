import { useState, useEffect } from "react";
import ShopSideBar from "@/components/shared/ShopSideBar";
import PlantCard from "@/components/shared/PlantCard";
import { useGetPlantsQuery } from "@/redux/services/plantApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { defaultPlants } from "@/assets/data/defaultPlants";
import { defaultCategories } from "@/assets/data/defaultCategories";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  SlidersHorizontal,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ShopPage = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("keyword") || "";
  const initialCategory = params.name || queryParams.get("category") || null;

  const [category, setCategory] = useState<string | null>(initialCategory);
  const [sortOrder, setSortOrder] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync category state when URL changes
  useEffect(() => {
    const currentCategory = params.name || new URLSearchParams(location.search).get("category") || null;
    setCategory(currentCategory);
    setPage(1);
  }, [params.name, location.search]);

  const { data, isLoading, isFetching } = useGetPlantsQuery({
    searchQuery,
    category,
    sortOrder,
    page,
    limit,
  });

  const { data: categoryData } = useGetCategoriesQuery(null);
  const rawCategories = categoryData?.data || [];
  const categories = rawCategories.length > 0 ? rawCategories : defaultCategories;

  const rawPlants = data?.data || [];
  // Use fallback plants if API has 0 records and no specific non-matching search is active
  const plants =
    rawPlants.length > 0
      ? rawPlants
      : !searchQuery && !category
      ? defaultPlants
      : rawPlants;

  const handleCategoryChange = (selectedCategory: string | null) => {
    setCategory(selectedCategory);
    setPage(1);
    if (selectedCategory) {
      navigate(`/shop/category/${selectedCategory}`);
    } else {
      navigate("/shop");
    }
    setIsMobileFilterOpen(false);
  };

  const handleSortChange = (selectedSortOrder: string | null) => {
    setSortOrder(selectedSortOrder);
    setPage(1);
    setIsMobileFilterOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setCategory(null);
    setSortOrder(null);
    setPage(1);
    navigate("/shop");
  };

  // Find active category name
  const activeCategoryObj = categories.find(
    (c) => c._id === category || c.name.toLowerCase() === category?.toLowerCase()
  );
  const activeCategoryName = activeCategoryObj?.name || category;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Shop Header Banner */}
      <div className="mb-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-emerald-900/90 via-emerald-800 to-emerald-950 text-white relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#81ba00_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81ba00]/20 text-[#a3e635] text-xs font-bold tracking-wider uppercase backdrop-blur-xs">
            <Sparkles size={13} />
            Botanical Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            {activeCategoryName ? `${activeCategoryName} Plants` : "Explore All Plants"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Hand-nurtured indoor & outdoor greenery to purify your air and elevate your living space.
          </p>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3">
          <ShopSideBar
            categories={categories}
            selectedCategory={category}
            selectedSort={sortOrder}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onReset={handleResetFilters}
          />
        </aside>

        {/* Product Catalog Content (9 cols) */}
        <main className="lg:col-span-9 space-y-6">
          {/* Top Control Bar: Active Filters, Mobile Toggle, Items Count */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
            {/* Left: Mobile Filter Button & Active Filter Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={() => setIsMobileFilterOpen(true)}
                variant="outline"
                className="lg:hidden rounded-xl flex items-center gap-2 text-xs font-semibold dark:border-slate-700 dark:text-slate-200"
              >
                <Filter size={14} className="text-[#81ba00]" />
                <span>Filters & Sorting</span>
              </Button>

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                  <Search size={12} className="text-slate-400" />
                  <span>Keyword: "{searchQuery}"</span>
                  <button
                    onClick={() => navigate(category ? `/shop/category/${category}` : "/shop")}
                    className="hover:text-rose-500"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold rounded-full">
                  <span>{activeCategoryName}</span>
                  <button onClick={() => handleCategoryChange(null)} className="hover:text-rose-500">
                    <X size={13} />
                  </button>
                </span>
              )}

              {sortOrder && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full">
                  <SlidersHorizontal size={12} />
                  <span>{sortOrder === "asc" ? "Price: Low to High" : "Price: High to Low"}</span>
                  <button onClick={() => handleSortChange(null)} className="hover:text-rose-500">
                    <X size={13} />
                  </button>
                </span>
              )}
            </div>

            {/* Right: Items per page Selector & Results count */}
            <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>
                Showing <strong className="text-slate-800 dark:text-slate-200">{plants.length}</strong> plants
              </span>
              <div className="flex items-center gap-1.5">
                <span>Per Page:</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-hidden focus:border-[#81ba00]"
                >
                  <option value={6}>6</option>
                  <option value={12}>12</option>
                  <option value={18}>18</option>
                  <option value={24}>24</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading || isFetching ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(limit)].map((_, idx) => (
                <div key={idx} className="botanical-card p-4 space-y-3 animate-pulse dark:bg-slate-900">
                  <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4 mx-auto" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 mx-auto" />
                </div>
              ))}
            </div>
          ) : plants.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plants.map((plant) => (
                <PlantCard key={plant._id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#81ba00]/10 text-[#81ba00] mx-auto flex items-center justify-center">
                <Search size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">No Plants Found</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                We couldn't find any botanical matches for your current filter criteria. Try adjusting your search term or resetting your filters.
              </p>
              <Button
                onClick={handleResetFilters}
                className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6 text-xs font-semibold"
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Modern Pagination Controls */}
          {plants.length > 0 && (
            <div className="pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <p className="text-xs text-slate-500 font-medium">
                Page <span className="font-bold text-slate-800">{page}</span>
              </p>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="rounded-xl flex items-center gap-1 text-xs font-semibold disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </Button>

                {/* Page Number Chips */}
                <div className="flex items-center gap-1">
                  {page > 2 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="w-8 h-8 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      1
                    </button>
                  )}

                  {page > 3 && <span className="text-xs text-slate-400 px-1">...</span>}

                  {page > 1 && (
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="w-8 h-8 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      {page - 1}
                    </button>
                  )}

                  <button
                    className="w-8 h-8 rounded-xl text-xs font-bold bg-[#81ba00] text-white shadow-xs"
                    disabled
                  >
                    {page}
                  </button>

                  {plants.length >= limit && (
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="w-8 h-8 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      {page + 1}
                    </button>
                  )}
                </div>

                {/* Next Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={plants.length < limit}
                  className="rounded-xl flex items-center gap-1 text-xs font-semibold disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Filter size={18} className="text-[#81ba00]" />
                <span>Filters & Sorting</span>
              </h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4">
              <ShopSideBar
                categories={categories}
                selectedCategory={category}
                selectedSort={sortOrder}
                onCategoryChange={handleCategoryChange}
                onSortChange={handleSortChange}
                onReset={handleResetFilters}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
