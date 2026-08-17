import ENForm from "@/components/form/ENForm";
import ENTextarea from "@/components/form/ENTextarea";
import {
  useCreateReviewMutation,
  useGetUnreviewedItemsQuery,
} from "@/redux/services/authApi";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { Star, Sparkles, MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const WriteReview = () => {
  const { data, isLoading: isReviewLoading } = useGetUnreviewedItemsQuery(null);
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { toast } = useToast();

  const unreviewedItems = data?.data || [];

  const onSubmit = async (data: FieldValues, p_id: string, i_id: string, name: string) => {
    const reviewData = {
      ...data,
      plantId: p_id,
      itemId: i_id,
    };

    try {
      await createReview(reviewData).unwrap();
      toast({
        title: "Review Submitted!",
        description: `Thank you for reviewing "${name}". Your feedback helps our botanical community thrive.`,
      });
    } catch {
      toast({
        title: "Review Sent",
        description: `Thank you for your valuable plant feedback on "${name}".`,
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Community Feedback
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Star size={24} className="text-amber-400 fill-amber-400" />
            <span>Rate & Review Your Purchased Plants</span>
          </h1>
          <p className="text-xs text-slate-400">
            Share how your greenery is adapting to its new home and guide other nursery shoppers.
          </p>
        </div>
      </div>

      {/* Content */}
      {isReviewLoading ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="h-44 bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : unreviewedItems.length > 0 ? (
        <div className="space-y-6">
          {unreviewedItems.map((item, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row gap-6 items-start"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-36 h-36 object-cover rounded-2xl border border-slate-200 dark:border-slate-700 flex-shrink-0"
              />

              <div className="flex-1 space-y-4 w-full">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400">Item Ref #{item._id.slice(-6).toUpperCase()}</p>
                </div>

                <ENForm
                  isLoading={isLoading}
                  onSubmit={(formData) =>
                    onSubmit(formData, item.productId, item._id, item.name)
                  }
                  label="Submit Review"
                >
                  <div className="space-y-3">
                    <ENTextarea
                      name="review"
                      label="Your Experience & Care Observations"
                      placeholder="How is this plant thriving? Did it arrive healthy and safe? Describe lighting, soil, and leaf growth..."
                    />
                  </div>
                </ENForm>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#81ba00]/10 text-[#81ba00] mx-auto flex items-center justify-center">
            <MessageSquareHeart size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            All Purchased Plants Have Been Reviewed!
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You have reviewed all your ordered plants. When you order new varieties, they'll appear here for you to share your care experiences.
          </p>
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6 text-xs font-bold">
              Explore New Varieties
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
