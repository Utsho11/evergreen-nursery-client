import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeletePlantMutation,
  useGetPlantsQuery,
} from "@/redux/services/plantApi";
import { Button } from "@/components/ui/button";
import {
  SquarePen,
  Trash2,
  PackagePlus,
  Search,
  CheckCircle2,
  AlertCircle,
  Sprout,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { defaultPlants } from "@/assets/data/defaultPlants";

const ManagePlants = () => {
  const { data, isLoading } = useGetPlantsQuery(null);
  const [deletePlant] = useDeletePlantMutation();
  const { toast } = useToast();
  const [searchFilter, setSearchFilter] = useState("");

  const rawPlants = data?.data || [];
  const plants = rawPlants.length > 0 ? rawPlants : defaultPlants;

  const filteredPlants = plants.filter((plant) =>
    plant.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    try {
      if (!id.startsWith("demo-plant")) {
        await deletePlant(id).unwrap();
      }
      toast({
        title: "Plant Removed",
        description: `"${title}" has been successfully removed from inventory.`,
      });
    } catch {
      toast({
        title: "Deletion Failed",
        description: "Unable to delete plant. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Sprout size={24} className="text-[#81ba00]" />
            <span>Botanical Inventory</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage living nursery stock, pricing, and botanical details
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter by plant name..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#81ba00]"
            />
          </div>

          <NavLink to="/admin/create-product">
            <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm">
              <PackagePlus size={16} />
              <span>Add New Plant</span>
            </Button>
          </NavLink>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredPlants.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <TableHead className="w-16">Image</TableHead>
                  <TableHead>Plant Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Retail Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlants.map((plant) => {
                  const imageSrc =
                    plant.images && plant.images.length > 0
                      ? plant.images[0]
                      : "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80";

                  return (
                    <TableRow
                      key={plant._id}
                      className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <TableCell>
                        <img
                          src={imageSrc}
                          alt={plant.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                        />
                      </TableCell>
                      <TableCell className="font-bold text-slate-800 dark:text-slate-100">
                        {plant.title}
                      </TableCell>
                      <TableCell>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                          {plant.category?.name || "General"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {plant.quantity > 0 ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} />
                            {plant.quantity} in stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full">
                            <AlertCircle size={12} />
                            Out of stock
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-extrabold text-slate-800 dark:text-slate-100">
                        ${plant.price.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {plant.discount && plant.discount > 0 ? (
                          <span className="text-xs font-bold text-[#81ba00]">
                            {plant.discount}% OFF
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <NavLink to={`/admin/update-plants/${plant._id}`}>
                            <button
                              aria-label="Edit plant"
                              className="w-8 h-8 rounded-xl flex items-center justify-center text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                            >
                              <SquarePen size={16} />
                            </button>
                          </NavLink>
                          <button
                            onClick={() => handleDelete(plant._id, plant.title)}
                            aria-label="Delete plant"
                            className="w-8 h-8 rounded-xl flex items-center justify-center text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-3">
            <Sprout size={36} className="text-[#81ba00] mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Plants Match</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No botanical species match your filter "{searchFilter}".
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePlants;
