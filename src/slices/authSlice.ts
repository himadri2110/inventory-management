import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  isAdmin: boolean;
};

const initialState: initialStateType = {
  isAdmin: true,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAdmin: (state, action) => {
      return {
        ...state,
        isAdmin: action.payload,
      };
    },
  },
});

export const { setIsAdmin } = authSlice.actions;

export default authSlice.reducer;
