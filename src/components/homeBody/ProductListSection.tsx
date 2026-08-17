import PlantCard from "../shared/PlantCard";
import { Button } from "../ui/button";
import { NavLink } from "react-router-dom";
import { useGetPlantsQuery } from "@/redux/services/plantApi";
import { ArrowRight, Sparkles } from "lucide-react";

const ProductListSection = () => {
  const { data: plants, isLoading } = useGetPlantsQuery({ limit: 8 });

  const plantList = plants?.data || [];

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          Curated Nursery Selection
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          Trending Plant Corner
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Hand-picked bestselling indoor greens, flowering pots, and rare air-purifying plants.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="botanical-card p-4 space-y-3 animate-pulse">
              <div className="aspect-square bg-slate-200 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 rounded-md w-3/4 mx-auto" />
              <div className="h-4 bg-slate-200 rounded-md w-1/2 mx-auto" />
            </div>
          ))}
        </div>
      ) : plantList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plantList.slice(0, 8).map((plant) => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 text-sm">
          No featured plants found at the moment.
        </div>
      )}

      <div className="flex justify-center mt-12">
        <NavLink to="/shop">
          <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs font-bold px-8 py-6 shadow-md hover:shadow-lg flex items-center gap-2 transition-all">
            <span>Explore Entire Nursery</span>
            <ArrowRight size={16} />
          </Button>
        </NavLink>
      </div>
    </section>
  );
};

export default ProductListSection;
