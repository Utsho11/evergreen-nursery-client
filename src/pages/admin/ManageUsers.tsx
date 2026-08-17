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
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} from "@/redux/services/adminApi";
import { UserCheck, UserX, Users, Search, Shield, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(null);
  const [toggleUserStatus] = useToggleUserStatusMutation();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const rawUsers = data?.data || [];
  const filteredUsers = rawUsers.filter(
    (u) =>
      (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleState = async (userId: string, currentStatus: string, name: string) => {
    try {
      await toggleUserStatus({ userId }).unwrap();
      const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      toast({
        title: "User Status Updated",
        description: `${name}'s account is now ${newStatus}.`,
      });
    } catch {
      toast({
        title: "Action Failed",
        description: "Could not update user status. Please check permissions.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Users size={24} className="text-[#81ba00]" />
            <span>Manage User Accounts</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            View customer registrations, assign statuses, and monitor access roles
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#81ba00]"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <TableHead className="w-16">Avatar</TableHead>
                  <TableHead>User Details</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Account Status</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead className="text-right">Access Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <TableCell>
                      {user.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs">
                          {user.name ? user.name[0].toUpperCase() : <User size={16} />}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400 font-normal">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          user.role === "ADMIN"
                            ? "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {user.role === "ADMIN" && <Shield size={11} />}
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          user.status === "ACTIVE"
                            ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-50 dark:bg-rose-950/40 text-rose-600"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <button
                        onClick={() => handleToggleState(user._id, user.status, user.name || "User")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          user.status === "ACTIVE"
                            ? "text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100"
                            : "text-[#81ba00] bg-[#81ba00]/10 hover:bg-[#81ba00]/20"
                        }`}
                      >
                        {user.status === "ACTIVE" ? (
                          <>
                            <UserX size={14} />
                            <span>Block User</span>
                          </>
                        ) : (
                          <>
                            <UserCheck size={14} />
                            <span>Activate</span>
                          </>
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-3">
            <Users size={36} className="text-[#81ba00] mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Users Found</h3>
            <p className="text-xs text-slate-400">
              No registered user accounts match your search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
