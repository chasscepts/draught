import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import drawerReducer from '../reducers/drawerSlice';

export const createStore = () => configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
  },
});

const store = createStore();

export default store;
