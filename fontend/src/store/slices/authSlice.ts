"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type authState = {
   GUID: string | undefined;
};

const initialState: authState = {
   GUID: undefined,
};

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setGUID: (state: authState, action: PayloadAction<string>) => {
         state.GUID = action.payload;
      },
      reset: () => initialState,
   },
});

export const { setGUID, reset } = authSlice.actions;
export const authSelector = (store: RootState) => store.auth;
export default authSlice.reducer;