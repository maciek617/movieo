import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter';
import userReducer from '../features/currentUser';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currentUser: userReducer,
  },
});
