import banner from "@/assets/bg/footer-parallax.webp";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import {
  useDeletePlantMutation,
  useGetPlantsQuery,
} from "@/redux/services/plantApi";
import { Button } from "@/components/ui/button";
import { SquarePen, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const ManagePlants = () => {
  const { data, isLoading } = useGetPlantsQuery(null);
  const [deletePlant] = useDeletePlantMutation();

  const plants = data?.data || [];

  console.log(plants);

  const handleDelete = (id: string) => {
    // console.log(id);
    deletePlant(id);
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
          Manage Plants
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="flex justify-center sm:mx-auto gap-5 mb-8">
          {plants.length > 0 ? (
            <div className="border w-[20rem] sm:w-[70rem]">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Price Per Item</TableHead>
                    <TableHead>Add Date</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plants.map((plant, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={plant.images[0]}
                          alt={plant.title}
                          className="w-20 h-10 sm:h-20 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>{plant.title}</TableCell>
                      <TableCell>{plant.quantity}</TableCell>
                      <TableCell>{plant.price}</TableCell>

                      <TableCell>
                        {new Date(plant.createdAt ?? "--").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleDelete(plant._id)}
                          size="icon"
                          // variant="outline"
                        >
                          <Trash2 size={20} className="text-rose-500" />
                        </Button>
                        <NavLink to={`/admin/update-plants/${plant._id}`}>
                          <Button
                            size="icon"
                            // variant="outline"
                          >
                            <SquarePen size={20} className="text-blue-500" />
                          </Button>
                        </NavLink>
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

export default ManagePlants;
