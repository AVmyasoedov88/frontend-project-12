import { createSlice } from "@reduxjs/toolkit";
import { omit } from "lodash";

// Начальное значение
const initialState = {
  channels: {},
  currentChannelId: null,
  messages: {
    1: { body: "message text", channelId: 1, username: "admin" },
    2: { body: "message text2", channelId: 2, username: "admin2" },
    3: { body: "message text2", channelId: 2, username: "admin2" },
    4: { body: "message text2", channelId: 2, username: "admin2" },
    5: { body: "message text3", channelId: 2, username: "admin3" },
  },
};

const channelMessageSlice = createSlice({
  name: "channelMessage",
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
      state.currentChannelId = Number(payload);
    },
    addMessages: (state, { payload }) => {
      payload.reduce((res, el) => {
        const { id, body, username, channelId } = el;
        res[id] = {
          id,
          body,
          username,
          channelId,
        };
        return res;
      }, state);
    },

    addMessage: (state, { payload }) => {
      const { id, body, username, channelId } = payload;
      state.messages[id] = { body, username, channelId };
    },

    deleteChannel: (state, { payload }) => {
      // { id: 6 };
      if (payload.id === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      delete state.channels[payload.id];
    },

    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      state.channels[id] = { ...state.channels[id], name };
    },
  },
});

export const {
  addChannel,
  addChannels,
  makeActiveChannel,
  addMessages,
  addMessage,
  deleteChannel,
  renameChannel,
} = channelMessageSlice.actions;

export default channelMessageSlice.reducer;
