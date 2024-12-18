import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks for API calls
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { categories } = getState(); // Access state
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

export const fetchSuggestedCategories = createAsyncThunk(
  "categories/fetchSuggestedCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/suggested-category/all");
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Error fetching suggested categories");
    }
  }
);

// New thunk for fetching categories from the "http://localhost:5000/api/category/all" endpoint
export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/api/category/all");
      return response.data.categories;
    } catch (error) {
      return rejectWithValue("Error fetching all categories");
    }
  }
);

// Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    suggestedData: [],
    allCategories: [], // New state for all categories
    loading: false,
    error: null,
  },
  reducers: {},
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
      })
      .addCase(fetchSuggestedCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSuggestedCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestedData = action.payload;
      })
      .addCase(fetchSuggestedCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategories = action.payload; // Populate allCategories state
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
