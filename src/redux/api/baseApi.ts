import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://evergreen-nursery-server.vercel.app",
    // baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["plant"],

  endpoints: () => ({}),
});
