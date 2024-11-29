import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});

export default store;
