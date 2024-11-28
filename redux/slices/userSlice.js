import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

export const login = createAsyncThunk(
  "userLoginSlice/login",
  async (
    { email, password, isExternalLogin, isStaffLogin },
    { rejectWithValue }
  ) => {
    try {
      const data = await api.post(`/Account/Login`, {
        email,
        password,
        isExternalLogin,
        isStaffLogin,
      });
      console.log(data);

      return data;
    } catch (error) {
      console.error(JSON.stringify(error.data));
      return rejectWithValue(error.data);
    }
  }
);

// export const registerPremium = createAsyncThunk(
//   "userSlice/registerPremium",
//   async ({ type }, { rejectWithValue }) => {
//     console.log("registerPremium", type);

//     try {
//       const data = await api.post(`/users/premium?type=${type}`);

//       console.log("registerPremium:", data.data);
//       return data.data;
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const getPremiumByUser = createAsyncThunk(
//   "userSlice/getPremiumByUser",
//   async (_, { rejectWithValue }) => {
//     console.log("getPremiumByUser");

//     try {
//       const data = await api.get(`/users/premium/getByUser`);

//       console.log("getPremiumByUser:", data.data);
//       return data.data;
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const register = createAsyncThunk(
//   "userSlice/register",
//   async (formData, { rejectWithValue }) => {
//     console.log("register");

//     try {
//       const data = await api.post(`/authen/register?type=username`, formData);

//       console.log("login data:", data);
//       return data.data;
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateUserProfile = createAsyncThunk(
//   "userSlice/updateUserProfile",
//   async (formData, { rejectWithValue }) => {
//     console.log("formData update", formData);

//     try {
//       const data = await api.put(`/users/${formData?.id}`, formData.data);

//       console.log("updateUser data:", data.data);
//       return data.data;
//     } catch (error) {
//       console.log("error", error);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userInfo: {},
    premium: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserLocation: (state, action) => {
      console.log("setUserLocation");
      const { longitude, latitude } = action.payload;
      state.userInfo.longitude = longitude;
      state.userInfo.latitude = latitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        AsyncStorage.setItem("accessToken", action.payload.data.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice;
