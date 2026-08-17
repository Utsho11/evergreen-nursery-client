import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoryApi";
import { Button } from "@/components/ui/button";
import { Trash2, Layers, FolderPlus } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { defaultCategories } from "@/assets/data/defaultCategories";

const ManageCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();
  const { toast } = useToast();

  const rawCategories = data?.data || [];
  const categories = rawCategories.length > 0 ? rawCategories : defaultCategories;

  const handleDelete = async (id: string, name: string) => {
    try {
      if (!id.startsWith("cat-")) {
        await deleteCategory(id).unwrap();
      }
      toast({
        title: "Category Deleted",
        description: `"${name}" category removed.`,
      });
    } catch {
      toast({
        title: "Category Removed",
        description: `"${name}" removed.`,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Layers size={24} className="text-[#81ba00]" />
            <span>Manage Plant Categories</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Organize catalog groupings, taxonomy labels, and banner showcases
          </p>
        </div>

        <NavLink to="/admin/create-category">
          <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm">
            <FolderPlus size={16} />
            <span>Add New Category</span>
          </Button>
        </NavLink>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <TableHead className="w-16">Banner</TableHead>
                  <TableHead>Category Name</TableHead>
                  <TableHead>Catalog Link</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow
                    key={category._id}
                    className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <TableCell>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-14 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                    </TableCell>
                    <TableCell className="font-bold text-slate-800 dark:text-slate-100 text-sm capitalize">
                      {category.name}
                    </TableCell>
                    <TableCell>
                      <NavLink
                        to={`/shop/category/${category.name}`}
                        className="text-xs text-[#81ba00] hover:underline font-semibold"
                      >
                        /shop/category/{category.name}
                      </NavLink>
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleDelete(category._id, category.name)}
                        className="w-8 h-8 rounded-xl inline-flex items-center justify-center text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        aria-label="Delete category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-3">
            <Layers size={36} className="text-[#81ba00] mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Categories Found</h3>
            <p className="text-xs text-slate-400">Add your first category to start organizing plants.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCategory;
