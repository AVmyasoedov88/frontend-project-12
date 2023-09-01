import { createSlice, current } from "@reduxjs/toolkit";

// Начальное значение
const initialState = {
  getStatusView: false,
};

const modalViewSlice = createSlice({
  name: "modalView",
  initialState,
  reducers: {
    getStatusView: (state, { payload }) => {
      state.view = payload;
      console.log(payload)
    },
  },
});

export const { getStatusView } = modalViewSlice.actions;

export default modalViewSlice.reducer;
