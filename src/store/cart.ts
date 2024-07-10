import { createSlice } from "@reduxjs/toolkit";
import { CartItem, CartProduct } from "../utils/types";

type InitialState = {
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  billAmount: number;
  discount: number;
};

const initialState: InitialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  billAmount: 0,
  discount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload as CartProduct;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + (newItem.mrp ?? 0);
        existingItem.discount =
          existingItem.discount + ((newItem.mrp ?? 0) - (newItem.price ?? 0));
        existingItem.billPrice = existingItem.billPrice + (newItem.price ?? 0);
      } else {
        state.cartItems.push({
          product: newItem,
          quantity: 1,
          totalPrice: newItem.mrp ?? 0,
          discount: (newItem.mrp ?? 0) - (newItem.price ?? 0),
          billPrice: newItem.price ?? 0,
        });
      }
      state.totalQuantity++;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.product.mrp ?? 0) * item.quantity,
        0
      );
      state.billAmount = state.cartItems.reduce(
        (total, item) => total + (item.product.price ?? 0) * item.quantity,
        0
      );
      state.discount = state.cartItems.reduce(
        (total, item) =>
          total +
          ((item.product.mrp ?? 0) - (item.product.price ?? 0)) * item.quantity,
        0
      );
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === id
      );
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter(
            (item) => item.product.id !== id
          );
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            existingItem.totalPrice - (existingItem.product.mrp ?? 0);
          existingItem.discount =
            existingItem.discount -
            ((existingItem.product.mrp ?? 0) -
              (existingItem.product.price ?? 0));
          existingItem.billPrice =
            existingItem.billPrice - (existingItem.product.price ?? 0);
        }
      }
      state.totalQuantity--;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.product.mrp ?? 0) * item.quantity,
        0
      );
      state.billAmount = state.cartItems.reduce(
        (total, item) => total + (item.product.price ?? 0) * item.quantity,
        0
      );
      state.discount = state.cartItems.reduce(
        (total, item) =>
          total +
          ((item.product.mrp ?? 0) - (item.product.price ?? 0)) * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.billAmount = 0;
      state.discount = 0;
    },
  },
});

export default cartSlice.reducer;
export const { addItem, removeItem, clearCart } = cartSlice.actions;
