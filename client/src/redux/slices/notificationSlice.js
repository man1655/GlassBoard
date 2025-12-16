import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Fetch Notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${API_URL}/api/notifications`, config);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// Mark Read
export const markNotificationsRead = createAsyncThunk(
  'notifications/markRead',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.put(`${API_URL}/api/notifications/read`, {}, config);
    return;
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: { items: [], unreadCount: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.items = action.payload;
        state.unreadCount = action.payload.filter(n => !n.isRead).length;
      })
      .addCase(markNotificationsRead.fulfilled, (state) => {
        state.items.forEach(n => n.isRead = true);
        state.unreadCount = 0;
      });
  },
});

export default notificationSlice.reducer;