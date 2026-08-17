import SalesChart from "@/components/sales/SalesChart";
import {
  useGetAllBlogsQuery,
  useGetAllTransactionHistoryQuery,
  useGetAllUsersQuery,
} from "@/redux/services/adminApi";
import { useGetMeQuery } from "@/redux/services/authApi";
import { useGetPlantsQuery } from "@/redux/services/plantApi";
import {
  Users,
  ShoppingCart,
  Sprout,
  DollarSign,
  TrendingUp,
  PackagePlus,
  Layers,
  Sparkles,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminProfile = () => {
  const { data: users } = useGetAllUsersQuery(null);
  const { data: blogs } = useGetAllBlogsQuery(null);
  const { data: orders } = useGetAllTransactionHistoryQuery(null);
  const { data: plants } = useGetPlantsQuery(null);
  const { data: me } = useGetMeQuery(null);

  const totalUsers = users?.data?.length || 0;
  const totalBlogs = blogs?.data?.length || 0;
  const rawOrders = orders?.data || [];
  const totalOrders = rawOrders.length;
  const totalPlants = plants?.data?.length || 0;
  const user = me?.data;

  // Process monthly revenue
  const monthlySales = new Array(12).fill(0);
  let totalRevenue = 0;
  rawOrders.forEach((transaction) => {
    const price = Number(transaction.totalPrice) || 0;
    totalRevenue += price;
    if (transaction.createdAt) {
      const date = new Date(transaction.createdAt);
      const monthIndex = date.getMonth();
      monthlySales[monthIndex] += price;
    }
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/20 text-[#a3e635] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Administrator Workspace
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || "Admin"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Monitor nursery orders, botanical inventory, transactions, and horticultural content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/admin/create-product"
            className="inline-flex items-center gap-2 bg-[#81ba00] hover:bg-[#72a500] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <PackagePlus size={16} />
            <span>Add Plant</span>
          </NavLink>
          <NavLink
            to="/admin/create-category"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold backdrop-blur-xs transition-all"
          >
            <Layers size={16} />
            <span>Add Category</span>
          </NavLink>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Revenue
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ${totalRevenue.toFixed(2)}
            </h3>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={12} /> +12.4% this month
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Completed Orders
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalOrders}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              Nursery customer purchases
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <ShoppingCart size={22} />
          </div>
        </div>

        {/* Total Plant Inventory */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Plant Inventory
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalPlants}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              Active botanical listings
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center">
            <Sprout size={22} />
          </div>
        </div>

        {/* Total Users & Articles */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Registered Users
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalUsers}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              {totalBlogs} published journal guides
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>
      </section>

      {/* Sales Overview Chart */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Annual Revenue & Sales Curve
            </h2>
            <p className="text-xs text-slate-400">
              Track seasonal plant purchases throughout the calendar year
            </p>
          </div>
          <span className="text-xs font-bold text-[#81ba00] bg-[#81ba00]/10 px-3 py-1 rounded-full w-fit">
            Live Database Sync
          </span>
        </div>

        <div className="overflow-x-auto min-h-[280px]">
          <SalesChart monthlySales={monthlySales} />
        </div>
      </section>
    </div>
  );
};

export default AdminProfile;
