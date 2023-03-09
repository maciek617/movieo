import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'contact',
};

export const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    updateDisplayState: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDisplayState } = supportSlice.actions;

export default supportSlice.reducer;
