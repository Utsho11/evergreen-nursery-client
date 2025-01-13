import { TCategory, TResponseRedux } from "@/types";
import { baseApi } from "../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    getCategories: builder.query({
      query: () => ({
        url: "category/get-all-categories",
        method: "GET",
      }),
      providesTags: ["category"],

      transformResponse: (response: TResponseRedux<TCategory[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `category/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} = categoryApi;
