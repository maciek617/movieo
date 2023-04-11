import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter';
import userReducer from '../features/currentUser';
import supportReducer from '../features/support';
import browseFiltersReducer from '../features/browseFilters';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentUser: userReducer,
    support: supportReducer,
    browse: browseFiltersReducer,
  },
});
