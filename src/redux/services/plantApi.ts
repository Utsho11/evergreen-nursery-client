import { TPlant, TResponseRedux, TReview } from "@/types";
import { baseApi } from "../api/baseApi";

const plantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlant: builder.mutation({
      query: (data) => ({
        url: "/plant/create-plant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["plant"],
    }),

    getPlants: builder.query({
      query: (params) => {
        const { category, sortOrder, page, limit, searchQuery } = params || {};

        // Build the query string dynamically
        const queryString = new URLSearchParams({
          ...(searchQuery && { searchTerm: searchQuery }),
          ...(category && { category }),
          ...(sortOrder && {
            sortBy: sortOrder === "asc" ? "price_asc" : "price_desc",
          }),
          ...(page && { page }),
          ...(limit && { limit }),
        }).toString();

        return {
          url: `/plant/get-all-plants?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["plant"],

      transformResponse: (response: TResponseRedux<TPlant[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    getSinglePlant: builder.query({
      query: (id) => ({
        url: `/plant/get-plant/${id}`,
        method: "GET",
      }),
      providesTags: ["plant"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TPlant>) => {
        return {
          data: response.data,
        };
      },
    }),

    getSinglePlantReviews: builder.query({
      query: (id) => ({
        url: `/plant/get-reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TReview[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    deletePlant: builder.mutation({
      query: (id) => ({
        url: `plant/delete-plant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plant"],
    }),

    updatePlant: builder.mutation<void, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `plant/update-plant/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["plant"],
    }),
  }),
});

export const {
  useCreatePlantMutation,
  useGetPlantsQuery,
  useGetSinglePlantQuery,
  useGetSinglePlantReviewsQuery,
  useDeletePlantMutation,
  useUpdatePlantMutation,
} = plantApi;
