import { configureStore } from "@reduxjs/toolkit";
import session from "./session.slice";
import lock from "./lock.slice";
export const store = configureStore({ reducer: { session, lock } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
