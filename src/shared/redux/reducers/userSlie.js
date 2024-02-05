import { createSlice } from "@reduxjs/toolkit";

const initState = {
  user: null,
  userSignup: null,
  services: null,
  totalEarnings: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setServices: (state, action) => {
      state.services = action.payload;
    },
    setEarnings: (state, action) => {
      state.totalEarnings = action.payload;
    },
    setSignupUser: (state, action) => {
      state.userSignup = action.payload;
    },
    resetUser: () => initState,
  },
});

export const { setUser, setSignupUser, resetUser, setServices, setEarnings } =
  userSlice.actions;

export default userSlice.reducer;
