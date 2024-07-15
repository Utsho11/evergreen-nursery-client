import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TPlant = {
  _id?: string;
  title: string;
  image?: string;
  description: string;
  price: number;
  quantity: number;
  email: string;
  rating: number;
  category: string;
};

type TplantState = {
  plant: TPlant[];
};

const initialState: TplantState = {
  plant: [],
};

const plantSlice = createSlice({
  name: "plant",
  initialState,
  reducers: {
    addPlant: (state, action: PayloadAction<TPlant>) => {
      state.plant.push({ ...action.payload, ...action.payload });
    },
    removePlant: (state, action: PayloadAction<string>) => {
      state.plant = state.plant.filter((plant) => plant._id !== action.payload);
    },
    updatePlant: (state, action: PayloadAction<TPlant>) => {
      console.log(action.payload._id);

      const index = state.plant.findIndex(
        (plant) => plant._id === action.payload._id
      );
      if (index !== -1) {
        state.plant[index] = { ...state.plant[index], ...action.payload };
      }
    },
  },
});

export const { addPlant, removePlant, updatePlant } = plantSlice.actions;

export default plantSlice.reducer;
