import { TReview } from "@/types";

const PlantReview = ({ reviews }: { reviews: TReview[] }) => {
  return (
    <div className="border-y-2 rounded-3xl p-4 my-2">
      {reviews.map((review, index) => (
        <div key={index} className="mb-8">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={review.user.image}
              alt={review.user.name}
            />
            <div className="ml-4">
              <h4 className="text-sm font-bold">{review.user.name}</h4>
            </div>
          </div>
          <p className="text-sm my-2 ml-16">{review.review}</p>
        </div>
      ))}
    </div>
  );
};

export default PlantReview;
