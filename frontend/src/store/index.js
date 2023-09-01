import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "../slices/errorSlice.js";
import channelMessageSlice from "../slices/channelMessageSlice.js";
import modalViewSlice from "../slices/modalViewSlice.js"

export default configureStore({
  reducer: {
    errors: errorSlice,
    channelMessage: channelMessageSlice,
    modalView: modalViewSlice,
  },
});
