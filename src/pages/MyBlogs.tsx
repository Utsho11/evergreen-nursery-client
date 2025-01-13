import {
  useDeleteBlogMutation,
  useGetUserBlogQuery,
} from "@/redux/services/blogApi";
import banner from "@/assets/bg/footer-parallax.webp";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const MyBlogs = () => {
  const { data, isLoading } = useGetUserBlogQuery(null);
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.data || [];

  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    // console.log(id);
    await deleteBlog(id);
    toast({
      title: "Blog deleted successfully",
      description: "Your blog has been deleted successfully",
    });
  };

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">My Blogs</h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="flex justify-center sm:mx-auto gap-5 mb-8">
          {blogs.length > 0 ? (
            <div className="border w-[20rem] sm:w-[70rem]">
              <Table className="">
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Publish Date</TableHead>
                    <TableHead className="text-end">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.map((blog, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-20 h-10 sm:h-20 object-cover rounded-full"
                        />
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.author.name}</TableCell>
                      <TableCell>{blog.author.email}</TableCell>
                      <TableCell
                        className={`px-4 py-2 ${
                          blog.status === "ACTIVE"
                            ? "text-[#81BA00]"
                            : "text-rose-500"
                        }`}
                      >
                        {blog.status}
                      </TableCell>
                      <TableCell>
                        {new Date(blog?.createdAt ?? 0).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell className="text-end">
                        <Button
                          onClick={() => handleDelete(blog._id)}
                          size="icon"
                          variant="outline"
                        >
                          <Trash2 size={20} className="text-rose-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold ">No Blog Found.</h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
