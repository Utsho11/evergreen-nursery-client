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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useCreateOrderMutation,
} = authApi;
