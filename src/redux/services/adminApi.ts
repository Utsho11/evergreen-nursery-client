import { TOrderHistory, TResponseRedux, TUsers } from "@/types";
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

    toggleUserStatus: builder.mutation({
      query: (data) => ({
        url: "admin/change-user-status",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllTransactionHistoryQuery,
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
} = adminApi;
