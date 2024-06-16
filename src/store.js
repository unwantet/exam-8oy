// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/CartSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export  {store};
