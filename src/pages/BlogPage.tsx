import { useGetAllBlogsQuery } from "@/redux/services/adminApi";
import { NavLink } from "react-router-dom";
import { ArrowRight, BookOpen, Calendar, Sparkles } from "lucide-react";
import { defaultBlogs } from "@/assets/data/defaultBlogs";

const BlogPage = () => {
  const { data, isLoading } = useGetAllBlogsQuery(null);
  const rawBlogs = data?.data || [];
  const blogs = rawBlogs.length > 0 ? rawBlogs : defaultBlogs;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          Botanical Journal & Guides
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Plants Make Life Better
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
          Expert gardening tips, indoor plant care routines, propagation guides, and botanical inspiration written by our nursery horticulturists.
        </p>
      </div>

      {/* Blog Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="botanical-card p-4 space-y-3 animate-pulse dark:bg-slate-900">
              <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
              <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="botanical-card flex flex-col justify-between overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-slate-900 dark:border-slate-800"
            >
              {/* Featured Image */}
              <div className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl bg-slate-100 dark:bg-slate-800">
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
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <NavLink to={`/blog/${blog._id}`}>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 hover:text-[#81ba00] transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                  </NavLink>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {blog.blog}
                  </p>
                </div>

                {/* Read Action */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <BookOpen size={13} /> 3 min read
                  </span>
                  <NavLink
                    to={`/blog/${blog._id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#81ba00] hover:text-[#6a9900] group/btn"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </NavLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
          <BookOpen size={36} className="text-[#81ba00] mx-auto" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">No Articles Yet</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Check back soon for fresh plant guides and nursery tips!</p>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
