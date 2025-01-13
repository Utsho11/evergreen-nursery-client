import banner from "@/assets/bg/footer-parallax.webp";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} from "@/redux/services/adminApi";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ManageUsers = () => {
  const { data, isLoading } = useGetAllUsersQuery(null);
  const [toggleUserStatus] = useToggleUserStatusMutation();

  const users = data?.data || [];

  const handleToggleState = (userId: string) => {
    // console.log(userId);
    toggleUserStatus({ userId });
  };

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Transaction History
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="flex justify-center sm:mx-auto gap-5 mb-8">
          {users.length > 0 ? (
            <div className="border w-[20rem] sm:w-[70rem]">
              <Table className="">
                <TableCaption>Customer Order History</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-20 h-10 sm:h-20 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell
                        className={`px-4 py-2 ${
                          user.status === "ACTIVE"
                            ? "text-[#81BA00]"
                            : "text-rose-500"
                        }`}
                      >
                        {user.status}
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          onClick={() => handleToggleState(user._id)}
                          variant="outline"
                          size="icon"
                        >
                          {user.status === "ACTIVE" ? (
                            <UserX className="text-rose-500" />
                          ) : (
                            <UserCheck className="text-[#81BA00]" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold ">No User Found.</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
