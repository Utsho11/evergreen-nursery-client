import banner from "@/assets/bg/footer-parallax.webp";
import { useGetSingleBlogQuery } from "@/redux/services/blogApi";
import { NavLink, useParams } from "react-router-dom";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { data } = useGetSingleBlogQuery(id);

  const blog = data?.data;

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Blog Details Page
        </h1>
      </div>
      <div className="bg-white lg:shadow-md space-y-4 p-6 max-w-4xl mx-auto my-8">
        <div className="h-[50vh] lg:h-[70vh] overflow-hidden rounded-lg">
          <img
            src={blog?.image}
            alt={blog?.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{blog?.title}</h1>
          <h2 className="text-xl font-serif text-[#81BA00]">
            {new Date(blog?.createdAt ?? 0).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <p className="text-gray-700 text-base leading-relaxed">
            {blog?.blog}
          </p>
        </div>
        <div className="text-right">
          <NavLink to="/blogs" className="text-[#81BA00] underline">
            Back to Blogs
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
