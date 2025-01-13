import { Badge } from "@/components/ui/badge";

export type TUsers = {
  name?: string;
  role: string;
  image?: string;
  email: string;
  status: string;
};

const ProfileOverview = ({ name, role, image, email, status }: TUsers) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      {/* Profile Image */}
      <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-200">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-400">
            <span className="text-xl">No Image</span>
          </div>
        )}
      </div>

      {/* Profile Info */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800">{name || "N/A"}</h3>
        <p className="text-sm text-gray-600">{email}</p>
        <Badge variant="outline" className="px-3 py-1 capitalize">
          {role}
        </Badge>
        <Badge
          variant={status === "Active" ? "default" : "destructive"}
          className="px-3 py-1 capitalize"
        >
          {status}
        </Badge>
      </div>
    </div>
  );
};

export default ProfileOverview;
