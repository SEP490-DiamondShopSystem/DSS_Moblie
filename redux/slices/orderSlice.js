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

export const getOrderDetail = createAsyncThunk(
  "orderSlice/getOrderDetail",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.get(`/Order/${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const handleOrder = createAsyncThunk(
  "orderSlice/handleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const data = await api.put(`/Order/Proceed?orderId=${id}`);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const handleOrderLogDeliver = createAsyncThunk(
  "orderSlice/handleOrderLogDeliver",
  async ({ orderId, message, images }, { rejectWithValue }) => {
    console.log("images", images);

    try {
      const formData = new FormData();

      images.forEach((file) => formData.append("images", file));

      formData.append("message", message);

      const data = await api.post(
        `/Order/Log/${orderId}/Delivering`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: {
    orders: null,
    orderDetail: null,
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
      })
      .addCase(getOrderDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleOrder.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleOrderLogDeliver.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleOrderLogDeliver.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(handleOrderLogDeliver.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice;
