import { createSlice } from '@reduxjs/toolkit';

// create and export slice of App component
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    mode: 'home'
  },
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    }
  }
})

// generate and export action creators
export const { setMode } = appSlice.actions;
