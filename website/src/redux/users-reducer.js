import { createSlice } from "@reduxjs/toolkit";

import {
  updateUserThunk,
  createUserThunk,
  deleteUserThunk,
  findAllUsersThunk,
  findUserByIdThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  profileThunk} from "../services/users/users-thunks";
import {getCurrentUser} from "../services/users/users-service";

const initialState = {
  users: [],
  loading: false,
  error: null,
  currentUser: null,
}

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearErrLoad: (state) => {
      console.log("clearErrLoad");
      state.loading = false;
      state.error = null;
    },
    setError: (state, action) => {
      console.log("serror called");
      state.error = action.payload;
    }
  },
  extraReducers: {
    [updateUserThunk.fulfilled]: (state, action) => {
      state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
      );
    },
    [createUserThunk.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    [deleteUserThunk.fulfilled]: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    [findAllUsersThunk.pending]: (state, action) => {
      state.loading = true;
      state.users = [];
    },
    [findAllUsersThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [findAllUsersThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [findUserByIdThunk.pending]: (state, action) => {
      state.loading = true;
    },
    [findUserByIdThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [loginThunk.pending]: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    [loginThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [logoutThunk.fulfilled]: (state, action) => {
      state.currentUser = null;
    },
    [registerThunk.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    [registerThunk.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [profileThunk.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    }
  },
});
export default usersSlice.reducer;
export const {clearErrLoad, setError} = usersSlice.actions;

