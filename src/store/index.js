import { configureStore } from "@reduxjs/toolkit";
import lockReducer from "./lock.slice";
import sessionReducer from "./session.slice";

export const store = configureStore({
  reducer: {
    lock: lockReducer,
    session: sessionReducer,
  },
});
