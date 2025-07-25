import { configureStore } from "@reduxjs/toolkit";
import readmeReducer from "./readmeSlice";
import { loadState, saveState } from "../utils/localStorage";

export const store = configureStore({
  reducer: {
    readme: readmeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});