import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authSlice';
import drawerReducer from '../reducers/drawerSlice';
import friendsReducer from '../reducers/friendsSlice';
import feedbackReducer from '../reducers/feedbackSlice';
import inviteReducer from '../reducers/inviteSlice';

export const createStore = () => configureStore({
  reducer: {
    auth: authReducer,
    drawer: drawerReducer,
    friends: friendsReducer,
    feedback: feedbackReducer,
    invite: inviteReducer,
  },
});

const store = createStore();

export default store;
