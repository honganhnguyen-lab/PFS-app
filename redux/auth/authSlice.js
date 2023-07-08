import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
  },
  reducers: {
    setDataUser: (state, payload) => {
      state.user = payload;
    },
    logOut: state => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {setDataUser, logOut} = authSlice.actions;

export default authSlice.reducer;
