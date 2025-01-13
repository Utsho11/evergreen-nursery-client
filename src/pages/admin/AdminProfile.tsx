import SalesChart from "@/components/sales/SalesChart";
import ProfileOverview from "@/components/shared/ProfileOverview";
import {
  useGetAllBlogsQuery,
  useGetAllTransactionHistoryQuery,
  useGetAllUsersQuery,
} from "@/redux/services/adminApi";
import { useGetMeQuery } from "@/redux/services/authApi";
import { useGetPlantsQuery } from "@/redux/services/plantApi";
import { Users, FileText, ShoppingCart, Sprout } from "lucide-react";

const AdminProfile = () => {
  const { data: users } = useGetAllUsersQuery(null);
  const { data: blogs } = useGetAllBlogsQuery(null);
  const { data: orders } = useGetAllTransactionHistoryQuery(null);
  const { data: plants } = useGetPlantsQuery(null);
  const { data: me } = useGetMeQuery(null);
  const totalUsers = users?.data?.length || 0;
  const totalBlogs = blogs?.data?.length || 0;
  const totalOrders = orders?.data?.length || [];
  const totalPlants = plants?.data?.length || 0;

  // console.log(user?.data);
  const user = me?.data;

  const monthlySales = new Array(12).fill(0);

  // Process each transaction
  orders?.data?.forEach((transaction) => {
    const date = new Date(transaction.createdAt);
    const monthIndex = date.getMonth();
    monthlySales[monthIndex] += transaction.totalPrice;
  });

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </header>

        {/* Overview Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ProfileOverview
            name={user?.name ?? ""}
            role={user?.role ?? ""}
            image={user?.image ?? ""}
            email={user?.email ?? ""}
            status={user?.status ?? ""}
          />
          {[
            { icon: <ShoppingCart />, title: "Orders", count: totalOrders },
            { icon: <FileText />, title: "Blogs", count: totalBlogs },
            { icon: <Sprout />, title: "Plants", count: totalPlants },
            { icon: <Users />, title: "Users", count: totalUsers },
          ].map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4"
            >
              <div className="text-green-500">{item.icon}</div>
              <div>
                <h3 className="text-lg font-medium">{item.title}</h3>
                <p className="text-2xl font-bold">{item.count}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Chart */}
        <section className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-8 max-w-full overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Sales Overview</h2>
          <div className="overflow-x-auto">
            <SalesChart monthlySales={monthlySales} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminProfile;
