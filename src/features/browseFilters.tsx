import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface BrowseState {
  menu: string;
  platform: string;
  type: string;
  data: Array<any>;
}

const initialState: BrowseState = {
  menu: 'All movies',
  platform: 'Netflix',
  type: 'Action',
  data: [],
};

export const browseFilterSlice = createSlice({
  name: 'browseFilters',
  initialState,
  reducers: {
    updateMenu: (state, action) => {
      state.menu = action.payload;
    },
    updatePlatform: (state, action) => {
      state.platform = action.payload;
    },
    updateType: (state, action) => {
      state.type = action.payload;
    },
    updateData: (state: any, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateMenu, updatePlatform, updateType, updateData } =
  browseFilterSlice.actions;

export default browseFilterSlice.reducer;
