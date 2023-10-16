import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  channels: {},
  currentChannelId: null,
};

const channelMessageSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      payload.forEach(({ id, name, removable }) => {
        state.channels[id] = { name, removable };
      });
    },
    addChannel: (state, { payload }) => {
      const { id, name, removable } = payload;
      state.channels[id] = { name, removable };
    },
    makeActiveChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },

    deleteChannel: (state, { payload }) => {
      if (payload.id === state.currentChannelId) {
        state.currentChannelId = 1;
        console.log(state.currentChannelId);
      }
      delete state.channels[payload.id];
    },

    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      state.channels[id] = { ...state.channels[id], name };
    },

    clearChannel: (state) => {
      state.channels = {};
    },
  },
});

export const {
  addChannel,
  addChannels,
  makeActiveChannel,
  clearChannel,
  deleteChannel,
  renameChannel,
} = channelMessageSlice.actions;

export default channelMessageSlice.reducer;
