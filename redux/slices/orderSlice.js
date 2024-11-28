import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../services/api";

export const getAllOrder = createAsyncThunk(
  "orderSlice/getAllOrder",
  async (_, { rejectWithValue }) => {
    try {
      //   const {
      //     pageSize,
      //     start,
      //     Status,
      //     CreatedDate,
      //     ExpectedDate,
      //     Email,
      //     IsCustomize,
      //   } = params;

      let url = "/Order/All";

      //   const queryParams = new URLSearchParams();

      //   if (pageSize) queryParams.append("pageSize", pageSize);
      //   if (start) queryParams.append("start", start);
      //   if (Status) queryParams.append("Status", Status);
      //   if (CreatedDate) queryParams.append("CreatedDate", CreatedDate);
      //   if (ExpectedDate) queryParams.append("ExpectedDate", ExpectedDate);
      //   if (Email) queryParams.append("Email", Email);
      //   if (IsCustomize !== null || IsCustomize !== undefined)
      //     queryParams.append("IsCustomize", IsCustomize);

      //   if (queryParams.toString()) {
      //     url += `?${queryParams.toString()}`;
      //   }

      const data = await api.get(url);
      return data.data;
    } catch (error) {
      console.error(error.data);
      return rejectWithValue(error.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orders: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice;
