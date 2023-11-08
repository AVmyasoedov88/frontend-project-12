import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameChannel: false,
  editChannel: null,
  deleteChannel: null,
  renameChannel: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, { payload }) => {
      const currentState = state;
      currentState[payload] = true;
    },
    hideModal: (state, { payload }) => {
      const currentState = state;
      currentState[payload] = false;
    },
    editChannel: (state, { payload }) => {
      const currentState = state;
      currentState.editChannel = payload;
    },
    showDeleteChannel: (state, { payload }) => {
      const currentState = state;
      currentState.deleteChannel = payload;
    },
    showRenameChannel: (state, { payload }) => {
      const currentState = state;
      currentState.renameChannel = payload;
    },
  },
});

export const {
  showModal, hideModal, editChannel, showDeleteChannel, showRenameChannel,
} = modalsSlice.actions;

export default modalsSlice.reducer;
