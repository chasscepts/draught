import { createSlice } from '@reduxjs/toolkit';

let id = 0;

const slice = createSlice({
  name: 'feedback',
  initialState: {
    messages: [],
  },
  reducers: {
    pushFeedback: (state, { payload }) => {
      state.messages = [...state.messages, { id, text: payload.message || payload }];
      id += 1;
    },
    removeFeedback: (state, { payload }) => {
      state.messages = state.messages.filter((msg) => msg.id !== payload);
    },
  },
});

export const {
  pushFeedback,
  removeFeedback,
} = slice.actions;

export const selectFeedbacks = (state) => state.feedback.messages;

export default slice.reducer;
