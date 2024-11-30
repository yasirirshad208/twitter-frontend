import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./features/categoriesSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer, // Include the categories slice
  },
});

export default store;
