import {
  useDeleteBlogMutation,
  useGetUserBlogQuery,
} from "@/redux/services/blogApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, BookOpen, Sparkles, Plus, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { NavLink } from "react-router-dom";

const MyBlogs = () => {
  const { data, isLoading } = useGetUserBlogQuery(null);
  const [deleteBlog] = useDeleteBlogMutation();
  const blogs = data?.data || [];
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    await deleteBlog(id);
    toast({
      title: "Article Deleted",
      description: "Your blog post has been removed successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-slate-950 py-8 sm:py-12 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
              <Sparkles size={12} />
              Author Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
              My Botanical Articles
            </h1>
            <p className="text-xs text-slate-400">
              Manage, review, and track the publication status of your submitted plant guides.
            </p>
          </div>

          <NavLink to="/dashboard/publish-blog">
            <Button className="bg-[#81ba00] hover:bg-[#70a400] text-white rounded-full text-xs font-bold px-5 py-2.5 flex items-center gap-2 shadow-xs">
              <Plus size={15} />
              <span>Write New Article</span>
            </Button>
          </NavLink>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse space-y-3">
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4 mx-auto" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2 mx-auto" />
          </div>
        ) : blogs.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/70 dark:bg-slate-800/60">
                  <TableRow className="border-b border-slate-100 dark:border-slate-800">
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase">Article</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase">Author</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase">Status</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase">Published</TableHead>
                    <TableHead className="font-bold text-slate-700 dark:text-slate-300 text-xs uppercase text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {blogs.map((blog) => (
                    <TableRow key={blog._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-14 h-14 object-cover rounded-xl border border-slate-100 dark:border-slate-800 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-sm text-slate-800 dark:text-slate-100 line-clamp-1">{blog.title}</p>
                            <p className="text-xs text-slate-400 line-clamp-1">{blog.blog}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {blog.author?.name || "Author"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            blog.status === "ACTIVE"
                              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900"
                              : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900"
                          }`}
                        >
                          {blog.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-[#81ba00]" />
                          {new Date(blog?.createdAt ?? 0).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          onClick={() => handleDelete(blog._id)}
                          size="icon"
                          variant="ghost"
                          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
                          title="Delete Article"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ) : (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
            <BookOpen size={40} className="text-[#81ba00] mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">No Published Articles Yet</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Share your plant care tips, propagation experiences, or green living guides with our community.
              </p>
            </div>
            <NavLink to="/dashboard/publish-blog" className="inline-block pt-2">
              <Button className="bg-[#81ba00] hover:bg-[#70a400] text-white rounded-full text-xs font-bold px-6 py-2.5">
                Write Your First Article
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
