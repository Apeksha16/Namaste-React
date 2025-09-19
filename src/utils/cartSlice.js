import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    restaurantInfo: null, // Store restaurant info
  },
  reducers: {
    addItem: (state, action) => {
      const { item, restaurantInfo } = action.payload;
      
      // Check if item already exists in cart
      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      
      // Set restaurant info if cart is empty or update it
      if (state.items.length === 1 || !state.restaurantInfo) {
        state.restaurantInfo = restaurantInfo;
      }
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
        }
      }
      
      // Clear restaurant info if cart becomes empty
      if (state.items.length === 0) {
        state.restaurantInfo = null;
      }
    },
    clearCart: (state) => {
      state.items.length = 0;
      state.restaurantInfo = null;
    },
    replaceCart: (state, action) => {
      const { item, restaurantInfo } = action.payload;
      state.items = [{ ...item, quantity: 1 }];
      state.restaurantInfo = restaurantInfo;
    },
  },
});

export const { addItem, removeItem, clearCart, replaceCart } = cartSlice.actions;

export default cartSlice.reducer;