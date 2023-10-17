import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessages: (state, { payload }) => {
      payload.forEach(({ id, body, username, channelId }) => {
        state.messages[id] = { body, username, channelId };
      });
    },

    addMessage: (state, { payload }) => {
      const { id, body, username, channelId } = payload;
      state.messages[id] = { body, username, channelId };
    },
  },
});

export const { addMessages, addMessage } = messageSlice.actions;

export default messageSlice.reducer;
