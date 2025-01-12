import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '', //empty string means no notification is displayed
  reducers: {
    setNotification(state, action) { 
      return action.payload;// return the notification message
    },
    removeNotification: () => '', // Remove the notification (set to empty string)
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

// Improved thunk for notifications
export const setNotificationWithTimeout = (message, durationInSeconds) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(removeNotification());
    }, durationInSeconds * 5000);
  };
};
export default notificationSlice.reducer;

