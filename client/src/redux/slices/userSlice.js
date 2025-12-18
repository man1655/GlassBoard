import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserStats = createAsyncThunk(
  "users/fetchStats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/state`,
        config
      );

      return response.data.data; // { total, active, banned, null }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async ({ page = 1, search = "", Role = "", status = "" }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, search, Role, status },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,
        config
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,
        data,
        config
      );
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
console.log("DELETE TOKEN:", token);

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/admin/users/${id}`,  
        {
          headers: { 
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);





export const addUser = createAsyncThunk(
  "users/add",
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/users`,userData, 
        config
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    stats: {
      total: 0,
      active: 0,
      banned: 0,
      inactive:0,
      null: 0,
    },
    pagination: {
      page: 1,
      totalPage: 1,
      totalUsers: 0,
      limit: 10,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // USERS
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data.map((u) => ({
          ...u,
          role: u.Role || "Member", // Normalize
        }));
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // STATS
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })

      // UPDATE
      .addCase(updateUser.fulfilled, (state, action) => {
        state.list = state.list.map((user) =>
          user._id === action.payload._id ? action.payload: user
        );
      })

      // DELETE
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user._id !== action.payload._id);
      });
  },
});

export default userSlice.reducer;
