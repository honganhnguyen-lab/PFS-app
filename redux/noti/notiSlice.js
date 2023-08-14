import {createSlice, createSelector} from '@reduxjs/toolkit';

export const notiSlice = createSlice({
  name: 'noti',
  initialState: {
    listNoti: [],
  },
  reducers: {
    setListNoti: (state, payload) => {
      state.listNoti.push(payload.payload);
    },
  },
});

export const {setListNoti} = notiSlice.actions;

export default notiSlice.reducer;
