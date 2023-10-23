import { configureStore } from '@reduxjs/toolkit';
import channelSlice from '../slices/channelSlice';
import messageSlice from '../slices/messageSlice';

export default configureStore({
  reducer: {
    channel: channelSlice,
    message: messageSlice,
  },
});
