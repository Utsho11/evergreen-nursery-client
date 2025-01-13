import { TBlog, TOrderHistory, TResponseRedux, TUsers } from "@/types";
import { baseApi } from "../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTransactionHistory: builder.query({
      query: () => ({
        url: "/admin/get-all-transactions",
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

    getAllUsers: builder.query({
      query: () => ({
        url: "/admin/get-all-users",
        method: "GET",
      }),
      providesTags: ["user"],

      transformResponse: (response: TResponseRedux<TUsers[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: "/admin/get-all-blogs",
        method: "GET",
      }),
      providesTags: ["blog"],

      transformResponse: (response: TResponseRedux<TBlog[]>) => {
        return {
          data: response.data,
        };
      },
    }),

    toggleUserStatus: builder.mutation({
      query: (data) => ({
        url: "admin/change-user-status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),

    toggleBlogStatus: builder.mutation({
      query: (data) => ({
        url: "admin/change-blog-status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllTransactionHistoryQuery,
  useGetAllUsersQuery,
  useGetAllBlogsQuery,
  useToggleUserStatusMutation,
  useToggleBlogStatusMutation,
} = adminApi;
