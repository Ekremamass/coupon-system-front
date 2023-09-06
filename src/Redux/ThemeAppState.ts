import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "../Models/Theme";

interface ThemeState {
  theme: Theme,
}

const initialState: ThemeState = {
  theme: "light-mode",
};

export enum ActionType {
    UPDATED_THEME = "UPDATED_THEME"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      updatedThemeAction(state) {
        state.theme = state.theme === "light-mode" ? "dark-mode" : "light-mode"
      },
    },
  });
  
  export const {
    updatedThemeAction,
  } = themeSlice.actions;
  
  export const themeReducer = themeSlice.reducer;