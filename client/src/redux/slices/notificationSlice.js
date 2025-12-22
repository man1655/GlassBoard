import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/notification/`;

const initialState = {
  notifications: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};


export const createNotification = createAsyncThunk(
  'notifications/create',
  async (notificationData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.post(API_URL, notificationData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. Get All Notifications
export const getNotifications = createAsyncThunk(
  'notifications/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. Update Notification
export const updateNotification = createAsyncThunk(
  'notifications/update',
  async ({ id, notificationData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      const response = await axios.put(
        API_URL + id,
        notificationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 4. Delete Notification
export const deleteNotification = createAsyncThunk(
  'notifications/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;

      await axios.delete(API_URL + id, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return id; // return deleted ID
    } catch (error) { 
      const message =
        error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --------------------
// Slice
// --------------------
export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications.unshift(action.payload.data);
      })
      .addCase(createNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get All
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = action.payload.data;
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update
      .addCase(updateNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notifications = state.notifications.map((notif) =>
          notif._id === action.payload.data._id
            ? action.payload.data
            : notif
        );
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete
      .addCase(deleteNotification.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.notifications = state.notifications.filter(
          (notif) => notif._id !== action.payload
        );
      });
  },
});

export const { reset } = notificationSlice.actions;
export default notificationSlice.reducer;
