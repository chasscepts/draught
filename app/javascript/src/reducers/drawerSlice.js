import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'drawer',
  initialState: {
    isOpen: true,
  },
  reducers: {
    toggleState: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleState } = slice.actions;

export const selectIsDrawerOpen = (state) => state.drawer.isOpen;

export default slice.reducer;
