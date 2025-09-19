import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userInfo: null,
    users: [], // Store registered users (in real app, this would be in backend)
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
    register: (state, action) => {
      state.users.push(action.payload);
    },
    loadUsers: (state, action) => {
      state.users = action.payload;
    },
    loadUserSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userInfo = action.payload.userInfo;
    },
  },
});

export const { login, logout, register, loadUsers, loadUserSession } = userSlice.actions;

export default userSlice.reducer;