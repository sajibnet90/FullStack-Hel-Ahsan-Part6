import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', //empty string means no notification is displayed
  reducers: {
    setNotification(state, action) { // Set the notification message
      return action.payload;
    },
    removeNotification: () => '', // Remove the notification (set to empty string)
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

