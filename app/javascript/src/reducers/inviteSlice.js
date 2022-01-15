import { createSlice } from '@reduxjs/toolkit';
import { confirmFriend, rejectFriend, sendInvite } from '../api';
import { pushFeedback } from './feedbackSlice';
import { addFriend, removePendingRequest, removeSuggestion } from './friendsSlice';

const slice = createSlice({
  name: 'invite',
  initialState: {
    ongoingFriendRequests: [],
    ongoingFriendConfirmations: [],
    ongoingFriendRejections: [],
  },
  reducers: {
    sendRequest: (state, { payload }) => {
      state.ongoingFriendRequests = [...state.ongoingFriendRequests, payload]
    },
    removeRequest: (state, { payload }) => {
      state.ongoingFriendRequests = state.ongoingFriendRequests.filter((id) => id !== payload)
    },
    sendConfirm: (state, { payload }) => {
      state.ongoingFriendConfirmations = [...state.ongoingFriendConfirmations, payload]
    },
    removeConfirm: (state, { payload }) => {
      state.ongoingFriendConfirmations = state.ongoingFriendConfirmations.filter((id) => id !== payload)
    },
    sendReject: (state, { payload }) => {
      state.ongoingFriendRejections = [...state.ongoingFriendRejections, payload]
    },
    removeReject: (state, { payload }) => {
      state.ongoingFriendRejections = state.ongoingFriendRejections.filter((id) => id !== payload)
    },
  },
});

export const {
  sendRequest,
  removeRequest,
  sendConfirm,
  removeConfirm,
  sendReject,
  removeReject,
} = slice.actions;

export const selectOngoingFriendRequests = (state) => state.invite.ongoingFriendRequests;
export const selectOngoingFriendConfirmations = (state) => state.invite.ongoingFriendConfirmations;
export const selectOngoingFriendRejections = (state) => state.invite.ongoingFriendRejections;

export const sendRequestAsync = (friend) => (dispatch, getState) => {
  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  const active = [].find((req) => req === friend.id);
  if (active) return;
  
  dispatch(sendRequest(friend.id));

  sendInvite(user.token, friend.id)
    .then(() => {
      dispatch(removeRequest(friend.id));
      dispatch(removeSuggestion(friend.id))
    })
    .catch((err) => {
      dispatch(removeRequest(friend.id));
      dispatch(pushFeedback(err));
    });
};

export const confirmFriendAsync = (friend) => (dispatch, getState) => {
  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  const active = state.invite.ongoingFriendConfirmations.find((req) => req === friend.id);
  if (active) return;
  
  dispatch(sendConfirm(friend.id));

  confirmFriend(user.token, friend.id)
    .then(() => {
      dispatch(removeConfirm(friend.id));
      dispatch(addFriend(friend));
      dispatch(removePendingRequest(friend.id));
    })
    .catch((err) => {
      dispatch(removeConfirm(friend.id));
      dispatch(pushFeedback(err));
    });
};

export const rejectFriendAsync = (friend) => (dispatch, getState) => {
  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  const active = state.invite.ongoingFriendRejections.find((req) => req === friend.id);
  if (active) return;
  
  dispatch(sendReject(friend.id));

  rejectFriend(user.token, friend.id)
    .then(() => {
      dispatch(removeReject(friend.id));
      dispatch(removePendingRequest(friend.id))
    })
    .catch((err) => {
      dispatch(removeReject(friend.id));
      dispatch(pushFeedback(err));
    });
};

export default slice.reducer;
