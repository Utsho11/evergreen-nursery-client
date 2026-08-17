import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { useGetAllBlogsQuery } from "@/redux/services/adminApi";
import { defaultBlogs } from "@/assets/data/defaultBlogs";
import { ArrowRight, BookOpen, Calendar, Sparkles } from "lucide-react";

const BlogSection = () => {
  const { data, isLoading } = useGetAllBlogsQuery(null);
  const rawBlogs = data?.data || [];
  const blogs = rawBlogs.length > 0 ? rawBlogs : defaultBlogs;

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          Botanical Journal & Guides
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Plants Make Life Better
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Explore expert plant care routines, indoor purification guides, and nursery secrets.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="botanical-card p-4 space-y-3 animate-pulse">
              <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((blog) => (
            <article
              key={blog._id}
              className="botanical-card flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Featured Image */}
              <div className="relative h-52 sm:h-56 overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-800">
                <NavLink to={`/blog/${blog._id}`}>
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </NavLink>
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-slate-700 dark:text-slate-300 shadow-xs flex items-center gap-1.5">
                  <Calendar size={12} className="text-[#81ba00]" />
                  <span>
                    {new Date(blog.createdAt ?? 0).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <NavLink to={`/blog/${blog._id}`}>
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-[#81ba00] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                  </NavLink>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {blog.blog}
                  </p>
                </div>

                {/* Read Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <BookOpen size={12} /> 3 min read
                  </span>
                  <NavLink
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#81ba00] hover:text-[#6a9900] group/btn"
                  >
                    <span>Read Guide</span>
                    <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-12">
        <NavLink to="/blogs">
          <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full text-xs font-bold px-8 py-5 shadow-md flex items-center gap-2">
            <span>Explore All Journal Articles</span>
            <ArrowRight size={16} />
          </Button>
        </NavLink>
      </div>
    </section>
  );
};

export default BlogSection;
