import { useGetSingleBlogQuery } from "@/redux/services/blogApi";
import { NavLink, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Sparkles, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { defaultBlogs } from "@/assets/data/defaultBlogs";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { data, isLoading } = useGetSingleBlogQuery(id, {
    skip: !id || id.startsWith("demo-blog"),
  });
  const blog = data?.data || defaultBlogs.find((b) => b._id === id) || defaultBlogs[0];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Article link copied to your clipboard.",
      });
    }
  };

  if (isLoading && !blog) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
        <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
        <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl w-full" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Article Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">The blog article you are looking for does not exist.</p>
        <NavLink to="/blogs">
          <Button className="bg-[#81ba00] text-white rounded-full">Back to Articles</Button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-slate-950 py-8 sm:py-12 transition-colors duration-200">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-8">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <NavLink
            to="/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-[#81ba00] transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to All Articles</span>
          </NavLink>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#81ba00] text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
          >
            <Share2 size={13} />
            <span>Share</span>
          </button>
        </div>

        {/* Article Header */}
        <div className="space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Plant Care Guide
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-2 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs">
                <User size={14} />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200">Evergreen Nursery Staff</span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#81ba00]" />
              <span>
                {new Date(blog.createdAt ?? 0).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-[#81ba00]" />
              <span>3 min read</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-lg bg-slate-100 dark:bg-slate-800">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 pt-4">
          <p className="first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#81ba00] first-letter:mr-2 first-letter:float-left">
            {blog.blog}
          </p>
        </div>

        {/* Author & Footer Note Card */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-6 mt-12 transition-colors">
          <div className="w-16 h-16 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">
            🌱
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-800 dark:text-slate-100">Evergreen Horticultural Team</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dedicated to helping green thumbs grow healthy, thriving indoor and outdoor ecosystems with sustainable practices.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetailsPage;
