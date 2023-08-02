import { ClientType, LoginResModel } from "./../Models/Login";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: LoginResModel;
}

const initialState: AuthState = {
  user: { email: "", token: "", clientType: ClientType.LOGGED_OUT },
};

export enum ActionType {
  USER_lOGGED_IN = "USER_lOGGED_IN",
  USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<LoginResModel>) {
      state.user = action.payload;
    },

    userLoggedOut(state) {
      state.user = initialState.user;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
