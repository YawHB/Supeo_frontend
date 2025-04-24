import { PURGE } from "redux-persist";
import { createSlice } from "@reduxjs/toolkit";

/** @type {AuthState} */
const initialState = {
  authenticatedUser: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { setIsAuthenticated, setAuthenticatedUser } = authSlice.actions;
