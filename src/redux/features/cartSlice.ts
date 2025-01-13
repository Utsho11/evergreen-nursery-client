// src/features/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the cart item type
export interface CartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  discount: number;
  price: number; // Track available stock
  availableQuantity?: number; // Track available quantity
}

// Define the initial state type
export interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

// Create the cart slice
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        name: string;
        image: string;
        price: number;
        discount: number;
        availableQuantity: number;
      }>
    ) => {
      const {
        productId,
        quantity,
        name,
        image,
        price,
        discount,
        availableQuantity,
      } = action.payload;

      const discountPrice = quantity * (price - price * discount * 0.01);
      // Find existing item
      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Check if we are adding more than available quantity
        if (existingItem.quantity + quantity > availableQuantity) {
          console.error("Cannot add more products than available in stock.");
          return;
        }

        // Update quantity of existing item
        existingItem.quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          productId,
          name,
          image,
          quantity,
          discount,
          price: discountPrice,
        });
      }

      // Recalculate total
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      saveToLocalStorage(state);
    },
    removeCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.total = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      saveToLocalStorage(state);
    },
    increaseQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
      }>
    ) => {
      const { productId, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Increase quantity of existing item
        existingItem.quantity += quantity;

        // Recalculate total
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        saveToLocalStorage(state);
      }
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;

      const existingItem = state.items.find(
        (item) => item.productId === productId
      );

      if (existingItem) {
        // Decrease quantity of existing item
        existingItem.quantity -= quantity;

        if (existingItem.quantity <= 0) {
          // Remove item if quantity is zero or less
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        }

        // Recalculate total
        state.total = state.items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        saveToLocalStorage(state);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      saveToLocalStorage(state);
    },
  },
});

export const {
  addCart,
  removeCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Save state to local storage
const saveToLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

// Load state from local storage
export const loadFromLocalStorage = (): CartState => {
  const cartData = localStorage.getItem("cart");
  if (cartData) {
    return JSON.parse(cartData);
  }
  return initialState;
};
