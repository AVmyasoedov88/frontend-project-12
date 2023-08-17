import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "../slices/errorSlice.js";

export default configureStore({
  reducer: {
    errors: errorSlice,
  },
});
