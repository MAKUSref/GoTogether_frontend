import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionsState } from "./types";
import { USER_TYPE } from "../api/types";

const name = 'session';

const initialState: SessionsState = {
  userType: USER_TYPE.Guest
}

const sessionSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ userId: string, userType: USER_TYPE}>) {
      state.userId = action.payload.userId;
      state.userType = action.payload.userType;
    },
    logout(state) {
      state.userId = undefined;
      state.userType = USER_TYPE.Guest;
    }
  }
});

export const { setUser, logout } = sessionSlice.actions;
export default sessionSlice.reducer;
