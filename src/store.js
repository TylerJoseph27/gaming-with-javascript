import { configureStore } from '@reduxjs/toolkit';
import { appSlice, memoryGameSlice, turnBasedGameSlice } from 'components';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    memoryGame: memoryGameSlice.reducer,
    turnBasedGame: turnBasedGameSlice.reducer
  },
});
