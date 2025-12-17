  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL 

export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(`${API_URL}/api/user/state`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchDashboardChart = createAsyncThunk(
  'dashboard/fetchChart',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await axios.get(`${API_URL}/api/user/chart`, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalUsers: 0,
      newUsers: 0,
      activeSessions: 0,
    },
    chartData: [],
    isLoading: true,
    isError: false,
    message: '',
  },
  reducers: {
    resetDashboard: (state) => {
      state.isError = false;
      state.message = '';
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Stats Cases ---
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- Chart Cases ---
      .addCase(fetchDashboardChart.pending, (state) => {
        
        state.isLoading = true;
      })
      .addCase(fetchDashboardChart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chartData = action.payload.data;
      })
      .addCase(fetchDashboardChart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;