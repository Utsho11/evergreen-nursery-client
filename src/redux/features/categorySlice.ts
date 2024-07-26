import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCategory = {
  _id?: string; // or number, depending on your data model
  name: string;
};

type TcategoryState = {
  category: TCategory[];
};

const initialState: TcategoryState = {
  category: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addcategory: (state, action: PayloadAction<TCategory>) => {
      state.category.push({ ...action.payload, ...action.payload });
    },
    updateCategory: (state, action: PayloadAction<TCategory>) => {
      const index = state.category.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.category[index] = { ...state.category[index], ...action.payload };
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.category = state.category.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export const { addcategory, updateCategory, removeCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
