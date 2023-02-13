import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "./session/sessionSlice";
import apiSlice from "./api/apiSlice";

export const store = configureStore({
  reducer: {
    session: sessionSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
