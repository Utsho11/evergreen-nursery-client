import { createSlice } from "@reduxjs/toolkit";

export interface Customer {
  name: string;
  phone: number;
  address: string;
}

const customerSlice = createSlice({
  name: "customer",
  initialState: [] as Customer[],
  reducers: {
    addCustomer: (state, action: { payload: Customer }) => {
      state.push(action.payload);
    },
  },
});

export const { addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
