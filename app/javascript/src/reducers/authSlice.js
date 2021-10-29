import { createSlice } from '@reduxjs/toolkit';
import { login, register } from '../api';

/* eslint-disable no-param-reassign */
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    authenticated: false,
    loginError: null,
    registrationError: null,
    registrationSuccess: false,
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.authenticated = true;
      state.user = payload;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
      state.loginSuccess = true;
    },
    setLoginError: (state, { payload }) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = payload;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
    clearLoginError: (state) => {
      state.loginError = null;
    },
    setRegistrationError: (state, { payload }) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = null;
      state.registrationError = payload;
      state.registrationSuccess = false;
    },
    clearRegistrationError: (state) => {
      state.registrationError = null;
    },
    setRegistrationSuccess: (state, { payload }) => {
      state.registrationSuccess = payload;
    },
    logout: (state) => {
      state.authenticated = false;
      state.user = null;
      state.loginError = null;
      state.registrationError = null;
      state.registrationSuccess = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const {
  setUser,
  setLoginError,
  clearLoginError,
  setRegistrationError,
  clearRegistrationError,
  setRegistrationSuccess,
  logout,
} = authSlice.actions;

export const loginAsyn = (email, password) => (dispatch, getState) => {
  const { auth: { user } } = getState();
  if (user) return;

  login(email, password)
    .then((data) => dispatch(setUser(data)))
    .catch(({ message }) => dispatch(setLoginError(message)));
};

export const registerAsync = (email, username, password) => (dispatch) => {
  register(email, username, password)
    .then(() => dispatch(setRegistrationSuccess(true)))
    .catch(({ message }) => dispatch(setRegistrationError(message)));
};

export const selectUser = (state) => state.auth.user;

export const selectAuthenticated = (state) => state.auth.authenticated;

export const selectLoginError = (state) => state.auth.loginError;

export const selectRegistrationSuccess = (state) => state.auth.registrationSuccess;

export const selectRegistrationError = (state) => state.auth.registrationError;

export default authSlice.reducer;
