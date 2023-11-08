import { configureStore } from '@reduxjs/toolkit';
import channelSlice from '../slices/channelSlice';
import messageSlice from '../slices/messageSlice';
import modalsSlice from '../slices/modalSlice';

export default configureStore({
  reducer: {
    channel: channelSlice,
    message: messageSlice,
    modals: modalsSlice,
  },
});
