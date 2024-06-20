import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, { payload }) => {
      const { product } = payload;
      
      // Mahsulotni mavjudligini tekshirish
      const existingProduct = state.cartItems.find((item) => item.customID === product.customID);
    
      // Agar mahsulot mavjud bo'lsa, miqdorni oshirish
      if (existingProduct) {
        existingProduct.amount += product.amount;
      } else {
        // Mahsulotni yangi id bilan ro'yxatga qo'shish
        state.cartItems.push({ ...product, customID: product.customID });
      }
    
      // Umumiy miqdor va jami summani yangilash
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      
      // Yangi umumiy hisob-kitoblarni hisoblash
      cartSlice.caseReducers.calculateTotals(state);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    
    clearCart: (state) => {
      return defaultState;
    },
    removeItem: (state, { payload }) => {
      const { id } = payload;
      const product = state.cartItems.find((item) => item.customID === id);
      state.cartItems = state.cartItems.filter((item) => item.customID !== id);

      state.numItemsInCart -= product.amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    editItem: (state, { payload }) => {
      const { id, amount } = payload;
      const item = state.cartItems.find((item) => item.customID === id); // `id` o'rniga `customID` ishlatish
    
      if (item) {
        state.numItemsInCart += amount - item.amount;
        state.cartTotal += item.price * (amount - item.amount);
        item.amount = amount;
        cartSlice.caseReducers.calculateTotals(state);
      }
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    updateFromLocalStorage: (state) => {
      const savedState = JSON.parse(localStorage.getItem("cart")) || defaultState;
      return { ...state, ...savedState };
    },
  },
});

export const { addItem, clearCart, removeItem, editItem, calculateTotals, updateFromLocalStorage } = cartSlice.actions;
export default cartSlice.reducer;
