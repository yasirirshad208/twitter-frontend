import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { categories } = getState(); // Access state
      // Skip fetching if categories are already available
      if (categories.data.length > 0) {
        return categories.data;
      }
      const response = await axios.get("http://localhost:5000/api/twitter/trending/categories");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Error fetching categories");
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [], // Holds the fetched data
    loading: false, // Loading state
    error: null, // Error message
  },
  reducers: {}, // Optional additional reducers if needed
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
