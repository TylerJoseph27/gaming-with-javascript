import { createSlice } from '@reduxjs/toolkit';

// create and export slice of App component
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'home'
  },
  reducers: {
    changeMode: (state, action) => {
      state.mode = action.payload;
    }
  }
})

// generate and export action creators
export const { changeMode } = appSlice.actions;
