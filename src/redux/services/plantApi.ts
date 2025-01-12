import { TPlant, TResponseRedux } from "@/types";
import { baseApi } from "../api/baseApi";

const plantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlant: builder.mutation({
      query: (data) => ({
        url: "/plant/create-plant",
        method: "POST",
        body: data,
      }),
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

      transformResponse: (response: TResponseRedux<TPlant>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useCreatePlantMutation,
  useGetPlantsQuery,
  useGetSinglePlantQuery,
} = plantApi;
