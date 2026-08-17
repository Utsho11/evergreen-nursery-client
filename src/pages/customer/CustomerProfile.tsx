import {
  useGetCustomerOrderHistoryQuery,
  useGetMeQuery,
} from "@/redux/services/authApi";
import { useGetUserBlogQuery } from "@/redux/services/blogApi";
import {
  ShoppingCart,
  FileText,
  DollarSign,
  Sparkles,
  ShoppingBag,
  Heart,
  Droplet,
  Sun,
  ArrowRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const CustomerProfile = () => {
  const { data: me } = useGetMeQuery(null);
  const { data: orders } = useGetCustomerOrderHistoryQuery(null);
  const { data: blogs } = useGetUserBlogQuery(null);

  const user = me?.data;
  const totalBlogs = blogs?.data?.length || 0;
  const orderList = orders?.data || [];
  const totalOrders = orderList.length;

  const totalSpent = orderList.reduce(
    (acc, order) => acc + (Number(order.totalPrice) || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-md">
        <div className="space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/20 text-[#a3e635] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Botanical Member
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hello, {user?.name || "Gardener"} 🌱
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80">
            Track your living plant deliveries, care reminders, and nursery orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#81ba00] hover:bg-[#72a500] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            <ShoppingBag size={16} />
            <span>Browse Shop</span>
          </NavLink>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Orders */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Orders Placed
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalOrders}
            </h3>
            <NavLink
              to="/customer/order-history"
              className="text-[11px] font-bold text-[#81ba00] hover:underline flex items-center gap-1"
            >
              <span>View History</span>
              <ArrowRight size={12} />
            </NavLink>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShoppingCart size={22} />
          </div>
        </div>

        {/* Total Spent */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Nursery Spend
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              ${totalSpent.toFixed(2)}
            </h3>
            <span className="text-[11px] font-medium text-slate-400">
              Across all deliveries
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
            <DollarSign size={22} />
          </div>
        </div>

        {/* Published Articles */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              My Journal Articles
            </p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100">
              {totalBlogs}
            </h3>
            <NavLink
              to="/publish-blog"
              className="text-[11px] font-bold text-[#81ba00] hover:underline flex items-center gap-1"
            >
              <span>Write Article</span>
              <ArrowRight size={12} />
            </NavLink>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <FileText size={22} />
          </div>
        </div>
      </section>

      {/* Grid: Plant Care Routine + Account Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plant Care Routine (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Droplet size={18} className="text-[#81ba00]" />
              <span>Weekly Plant Care Schedule</span>
            </h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full">
              Automated Guide
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center flex-shrink-0">
                <Droplet size={18} />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  Watering Check (Mon & Thu)
                </p>
                <p className="text-slate-400">
                  Inspect topsoil moisture for Monsteras and Fiddle Leaf Figs before watering.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0">
                <Sun size={18} />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  Sunlight Rotation (Every Saturday)
                </p>
                <p className="text-slate-400">
                  Rotate indoor pots by 90 degrees to ensure even chlorophyll distribution.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                <Heart size={18} />
              </div>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  Leaf Dusting & Misting
                </p>
                <p className="text-slate-400">
                  Gently wipe large foliage with a damp cloth to maximize photosynthesis.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-3">
              Account Information
            </h3>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#81ba00] text-white flex items-center justify-center font-bold text-xl shadow-md">
                {user?.name ? user.name[0].toUpperCase() : "C"}
              </div>
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                  {user?.name || "Customer"}
                </h4>
                <p className="text-xs text-slate-400">{user?.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#81ba00]/15 text-[#81ba00] rounded-full">
                  {user?.role || "CUSTOMER"}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#81ba00]/10 border border-[#81ba00]/20 space-y-2">
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
              🌿 Evergreen Nursery Guarantee
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              All plant orders include our 30-day health guarantee and direct support from our certified horticultural team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
