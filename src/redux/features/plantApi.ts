import { baseApi } from "../api/baseApi";
import { TPlant } from "./plantSlice";

const extendedPlantsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPlants: builder.query<
      { result: Plant[]; totalCount: number },
      {
        page: number | null;
        pageSize: number | null;
        sort?: string;
        sortOrder?: "asc" | "desc";
      }
    >({
      query: ({ page, pageSize, sort = "price", sortOrder = "asc" }) =>
        `products?page=${page}&pageSize=${pageSize}&sort=${sort}&sortOrder=${sortOrder}`,
      transformResponse: (response: { result: Plant[]; totalCount: number }) =>
        response,
      providesTags: ["plant"],
    }),

    getPlantById: builder.query<Plant, string>({
      query: (id) => `products/${id}`,
      transformResponse: (response: { product: Plant }) => response.product,
    }),
    getCategories: builder.query<Category[], void>({
      query: () => `categories`,
      transformResponse: (response: Category[]) => response,
    }),
    getPlantsWithoutPage: builder.query<Plant[], void>({
      query: () => `products`,
      transformResponse: (response: Plant[]) => response,
    }),
    postPlants: builder.mutation<Plant, Partial<Plant>>({
      query: (newPlant) => ({
        url: "products",
        method: "POST",
        body: newPlant,
      }),
      invalidatesTags: ["plant"],
      transformResponse: (response: Plant) => response,
    }),
    deletePlant: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["plant"],
    }),
    updatePlant: builder.mutation<
      TPlant,
      { id: string; updatedPlant: Partial<Omit<TPlant, "_id">> } // Ensure _id is not part of updatedPlant
    >({
      query: ({ id, updatedPlant }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: updatedPlant,
      }),
      invalidatesTags: ["plant"],
      transformResponse: (response: TPlant) => response,
    }),
    searchPlants: builder.query<TPlant[], { title: string }>({
      query: ({ title }) => `search?title=${encodeURIComponent(title)}`,
      transformResponse: (response: TPlant[]) => response,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPlantsQuery,
  useGetCategoriesQuery,
  useGetPlantsWithoutPageQuery,
  useGetPlantByIdQuery,
  usePostPlantsMutation,
  useDeletePlantMutation,
  useUpdatePlantMutation,
  useSearchPlantsQuery,
} = extendedPlantsApi;

// Define the Plant type
export interface Plant {
  _id?: string;
  image: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  email: string;
  quantity: number;
}

export interface Category {
  _id: string; // or number, depending on your data model
  name: string;
}
