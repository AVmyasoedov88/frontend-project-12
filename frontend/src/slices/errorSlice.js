import { createSlice, current } from "@reduxjs/toolkit";

// Начальное значение
const initialState = {
  errorLogin: null,
};

const errorSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    errorLogin: (state, { payload }) => {
      state.errorLogin = payload;
      
    },
  },
});

export const { errorLogin } = errorSlice.actions;

export default errorSlice.reducer;
