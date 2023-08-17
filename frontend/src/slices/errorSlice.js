import { createSlice, current } from "@reduxjs/toolkit";

// Начальное значение
const initialState = {
  errorLogin: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    errorLogin: (state, { payload }) => {
      state.errorLogin = payload;
      console.log(current(state));
    },
  },
});

export const { errorLogin } = errorSlice.actions;

export default errorSlice.reducer;
