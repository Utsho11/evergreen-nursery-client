// src/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import plantReducer from "./features/plantSlice";
import cartReducer, { loadFromLocalStorage } from "./features/cartSlice";
import categoryReducer from "./features/categorySlice";
import customerReducer from "./features/customerSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    plant: plantReducer,
    cart: cartReducer,
    category: categoryReducer,
    customer: customerReducer,
  },
  preloadedState: {
    cart: loadFromLocalStorage(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
