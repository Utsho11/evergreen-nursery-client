import { TOrderHistory, TResponseRedux, TUnreviewedPlant } from "@/types";
import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
      providesTags: ["user"],
      keepUnusedDataFor: 0,
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: "user/create-order",
        method: "POST",
        body: data,
      }),
    }),

    createReview: builder.mutation({
      query: (data) => ({
        url: "user/create-review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),

    getUnreviewedItems: builder.query({
      query: () => ({
        url: "/user/get-review",
        method: "GET",
      }),
      providesTags: ["review"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TUnreviewedPlant[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    getCustomerOrderHistory: builder.query({
      query: () => ({
        url: "/user/get-order",
        method: "GET",
      }),
      providesTags: ["order"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TOrderHistory[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useCreateOrderMutation,
  useGetUnreviewedItemsQuery,
  useCreateReviewMutation,
  useGetCustomerOrderHistoryQuery,
} = authApi;
