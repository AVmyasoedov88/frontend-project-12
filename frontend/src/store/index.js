import { configureStore } from "@reduxjs/toolkit";
import channelSlice from "../slices/channelSlice.js";
import modalViewSlice from "../slices/modalViewSlice.js";
import messageSlice from "../slices/messageSlice.js";

export default configureStore({
  reducer: {
    channel: channelSlice,
    modalView: modalViewSlice,
    message: messageSlice,
  },
});
