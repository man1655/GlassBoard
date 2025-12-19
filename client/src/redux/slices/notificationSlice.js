  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import notificationService from '../features/notificationService.js';

  const initialState = {
    notifications: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  };


  // 1. Create
  export const createNotification = createAsyncThunk(
    'notifications/create',
    async (notificationData, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await notificationService.createNotification(notificationData, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // 2. Get All
  export const getNotifications = createAsyncThunk(
    'notifications/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await notificationService.getNotifications(token);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  export const updateNotification = createAsyncThunk(
    'notifications/update',
    async ({ id, notificationData }, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await notificationService.updateNotification(id, notificationData, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );

  // 4. Delete
  export const deleteNotification = createAsyncThunk(
    'notifications/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.token;
        return await notificationService.deleteNotification(id, token);
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
      reset: (state) => state
    },
    extraReducers: (builder) => {
      builder
        // Create
        .addCase(createNotification.pending, (state) => { state.isLoading = true; })
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
        .addCase(getNotifications.pending, (state) => { state.isLoading = true; })
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
        .addCase(updateNotification.pending, (state) => { state.isLoading = true; })
        .addCase(updateNotification.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.notifications = state.notifications.map((notif) =>
            notif._id === action.payload.data._id ? action.payload.data : notif
          );
        })
        .addCase(updateNotification.rejected, (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        })

        // Delete
        .addCase(deleteNotification.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.notifications = state.notifications.filter(
            (notif) => notif._id !== action.meta.arg
          );
        });
    },
  });

  export const { reset } = notificationSlice.actions;
  export default notificationSlice.reducer;