import ProfileOverview from "@/components/shared/ProfileOverview";
import {
  useGetCustomerOrderHistoryQuery,
  useGetMeQuery,
} from "@/redux/services/authApi";
import { useGetUserBlogQuery } from "@/redux/services/blogApi";
import { ShoppingCart, FileText, DollarSign } from "lucide-react";

const CustomerProfile = () => {
  const { data: me } = useGetMeQuery(null);
  const { data: orders } = useGetCustomerOrderHistoryQuery(null);
  const { data: blogs } = useGetUserBlogQuery(null);

  const user = me?.data;

  const totalBlogs = blogs?.data?.length || 0;
  const totalOrders = orders?.data?.length || 0;

  const totalSpent = orders?.data?.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );

  return (
    <div className="flex-1 p-6 bg-gray-100">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        <p className="text-gray-600">
          Welcome back! Here's an overview of your account.
        </p>
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
          { icon: <DollarSign />, title: "Total Spent", count: totalSpent },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center p-4 bg-white rounded-lg shadow-md space-x-4"
          >
            <div className="text-green-500">{item.icon}</div>
            <div>
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="text-2xl font-bold">{item.count}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Activity */}
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-4">
          {[
            "You placed an order for 'Green Giant Arborvitae'.",
            "Added 'Angel Trumpet Datura' to wishlist.",
            "Your order #12345 has been delivered.",
          ].map((activity, index) => (
            <li
              key={index}
              className="p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200"
            >
              {activity}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CustomerProfile;
