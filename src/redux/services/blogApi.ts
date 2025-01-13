import { TBlog, TResponseRedux } from "@/types";
import { baseApi } from "../api/baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/user/create-blog",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `user/delete-blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/user/get-single-blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TBlog>) => {
        return {
          data: response.data,
        };
      },
    }),

    getUserBlog: builder.query({
      query: () => ({
        url: `/user/get-blog`,
        method: "GET",
      }),
      providesTags: ["blog"],
      keepUnusedDataFor: 0,

      transformResponse: (response: TResponseRedux<TBlog[]>) => {
        return {
          data: response.data,
        };
      },
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useGetUserBlogQuery,
  useGetSingleBlogQuery,
} = blogApi;
