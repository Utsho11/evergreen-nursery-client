import { useGetAllBlogsQuery } from "@/redux/services/adminApi";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { NavLink } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const BlogPage = () => {
  const { data, isLoading } = useGetAllBlogsQuery(null);

  const blogs = data?.data || [];

  return (
    <div className="my-32 container mx-auto">
      <div className="text-center mx-auto px-4 sm:px-8 md:px-16 lg:px-32">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium pb-8 sm:pb-12">
          Plants Make Life Better
        </h1>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed pb-6 sm:pb-8 md:pb-12">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Software like Aldus
          PageMaker, including versions of Lorem Ipsum, has used it to make a
          type specimen book.
        </p>
      </div>
      <div className="">
        {isLoading ? (
          <div className="flex justify-center items-center my-32">
            <Lottie options={defaultOptions} height={400} width={400} />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {blogs.map((blog, index) => (
                <div key={index}>
                  <div className="bg-white shadow-md space-y-4 pb-4">
                    <div className="wrapper h-[30vh]">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="px-4 space-y-2">
                      <h2 className="text-xl font-serif text-[#81BA00]">
                        {new Date(blog.createdAt ?? 0).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </h2>
                      <h2 className="text-xl font-medium">{blog.title}</h2>
                      <p className="text-[#767676] text-sm">
                        {blog.blog.length > 120
                          ? blog.blog.slice(0, 120) + "..."
                          : blog.blog}
                      </p>
                    </div>
                    <div className="px-4">
                      <NavLink to={`/blog/${blog._id}`}>
                        <button className="bg-[#81BA00] rounded-full p-2 text-white">
                          Read Blog
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
