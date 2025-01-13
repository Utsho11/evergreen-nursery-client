import banner from "@/assets/bg/footer-parallax.webp";
import ENForm from "@/components/form/ENForm";
import ENTextarea from "@/components/form/ENTextarea";
import {
  useCreateReviewMutation,
  useGetUnreviewedItemsQuery,
} from "@/redux/services/authApi";
import { FieldValues } from "react-hook-form";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import Lottie from "react-lottie";
import { NavLink } from "react-router-dom";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const WriteReview = () => {
  const { data, isLoading: isReviewLoading } = useGetUnreviewedItemsQuery(null);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const unreviewdItems = data?.data || [];

  const onSubmit = async (data: FieldValues, p_id: string, i_id: string) => {
    const reviewData = {
      ...data,
      plantId: p_id,
      itemId: i_id,
    };

    console.log(reviewData);
    await createReview(reviewData);
  };

  console.log(unreviewdItems);

  if (isReviewLoading) {
    return (
      <div className="flex justify-center items-center my-32">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Give Reviews
        </h1>
      </div>
      <div className="flex flex-col mb-10 lg:w-1/2 mx-auto gap-5 p-5 border rounded-lg shadow-md">
        {unreviewdItems.length > 0 ? (
          <>
            {unreviewdItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 border-b pb-5"
              >
                {/* Image Section */}
                <div className="flex-shrink-0 w-full md:w-1/3 h-[200px]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between flex-grow">
                  <h1 className="text-xl font-semibold text-gray-800 mb-3">
                    {item.name}
                  </h1>

                  {/* Review Form */}
                  <ENForm
                    isLoading={isLoading}
                    onSubmit={(formData) =>
                      onSubmit(formData, item.productId, item._id)
                    }
                    label="Submit Review"
                  >
                    <ENTextarea
                      name="review"
                      label="Write Review"
                      placeholder="Write a review"
                    />
                  </ENForm>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="">
            <h1 className="text-3xl font-semibold ">
              There is nothing to review. Please Buy Something.
            </h1>
            <NavLink to="/shop">
              <button className="bg-[#81ba00] flex justify-center mx-auto rounded-full text-sm font-medium px-6 py-2 text-center my-6">
                Go Shop
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteReview;
