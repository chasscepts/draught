import { createSlice } from '@reduxjs/toolkit';
import { loadFriends, loadPendingRequests, loadSuggestions } from '../api';
import { pushFeedback } from './feedbackSlice';

const slice = createSlice({
  name: 'friends',
  initialState: {
    suggestions: [],
    suggestionsPage: 0,
    hasMoreSuggestions: false,
    friends: [],
    pendingRequests: [],
    loadingSuggestions: false,
    loadingFriends: false,
    loadedFriends: false,
    loadingRequests: false,
    loadedRequests: false,
  },
  reducers: {
    setSuggestions: (state, { payload }) => {
      state.suggestions = [...state.suggestions, ...payload];
      state.suggestionsPage += 1;
      state.loadingSuggestions = false;
      if (payload.length >= 20) {
        state.hasMoreSuggestions = true;
      }
    },
    removeSuggestion: (state, { payload }) => {
      state.suggestions = state.suggestions.filter((user) => user.id !== payload);
    },
    setFriends: (state, { payload }) => {
      state.friends = payload;
      state.loadingFriends = false;
      state.loadedFriends = true;
    },
    addFriend: (state, { payload }) => {
      state.friends.push(payload);
    },
    removeFriend: (state, { payload }) => {
      state.friends = state.friends.filter((user) => user.id !== payload);
    },
    setPendingRequests: (state, { payload }) => {
      state.pendingRequests = payload;
      state.loadingRequests = false;
      state.loadedRequests = true;
    },
    removePendingRequest: (state, { payload }) => {
      state.pendingRequests = state.pendingRequests.filter((user) => user.id !== payload);
    },
    confirmFriend: (state, { payload }) => {
      state.friends.push(payload);
    },
    setLoadingSuggestions: (state, { payload }) => {
      state.loadingSuggestions = payload;
    },
    setLoadingFriends: (state, { payload }) => {
      state.loadingFriends = payload;
    },
    setLoadingRequests: (state, { payload }) => {
      state.loadingRequests = payload;
    },
  },
});

export const {
  setSuggestions,
  removeSuggestion,
  setFriends,
  addFriend,
  removeFriend,
  setPendingRequests,
  removePendingRequest,
  confirmFriend,
  setLoadingSuggestions,
  setLoadingFriends,
  setLoadingRequests,
} = slice.actions;

export const selectSuggestions = (state) => state.friends.suggestions;
export const selectFriends = (state) => state.friends.friends;
export const selectPendingRequests = (state) => state.friends.pendingRequests;
export const selectLoadingSuggestions = (state) => state.friends.loadingSuggestions;
export const selectLoadingFriends = (state) => state.friends.loadingFriends;
export const selectLoadingRequests = (state) => state.friends.loadingRequests;
export const selectSuggestionsPage = (state) => state.friends.suggestionsPage;

export const loadSuggestionsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.friends.loadingSuggestions || state.friends.loadedSuggestions) return;
  dispatch(setLoadingSuggestions(true));
  loadSuggestions(state.friends.suggestionsPage)
    .then((suggestions) => dispatch(setSuggestions(suggestions)))
    .catch((err) => {
      dispatch(pushFeedback(err));
      dispatch(setLoadingSuggestions(false));
    });
};

export const loadFriendsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.friends.loadingFriends || state.friends.loadedFriends) return;
  const user = state.auth.user;
  if (!user) {
    return;
  }
  dispatch(setLoadingFriends(true));
  loadFriends(user.token)
    .then((friends) => dispatch(setFriends(friends)))
    .catch((err) => {
      dispatch(setLoadingFriends(false));
      dispatch(pushFeedback(err));
    });
};

export const loadPendingRequestsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.friends.loadingRequests || state.friends.loadedRequests) return;
  const user = state.auth.user;
  if (!user) {
    return;
  }
  dispatch(setLoadingRequests(true));
  loadPendingRequests(user.token)
    .then((requests) => dispatch(setPendingRequests(requests)))
    .catch((err) => {
      dispatch(setLoadingRequests(false));
      dispatch(pushFeedback(err));
    });
};

export default slice.reducer;
