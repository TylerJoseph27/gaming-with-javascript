import { createSlice } from '@reduxjs/toolkit';
import * as assets from 'assets';

// create and export slice of MemoryGame component
export const memoryGameSlice = createSlice({
  name: 'memoryGame',
  initialState: {
    cards: [
      [...assets.equipment],
      [...assets.food],
      [...assets.materials],
      [...assets.misc],
      [...assets.monsterParts],
      [...assets.oresAndGems],
      [...assets.potions],
      [...assets.weaponsAndTools]
    ],
    cardFaces: [],
    cardIndices: [],
    cardOrder: [],
    currentCards: [],
    firstCard: null,
    secondCard: null,
    turnCount: 0,
    disabled: false
  },
  reducers: {
    setCardFaces: (state, action) => {
      state.cardFaces = state.cards[action.payload];
    },
    setCardIndices: (state, action) => {
      state.cardIndices = action.payload;
    },
    setCardOrder: (state, action) => {
      state.cardOrder = action.payload;
    },
    setCurrentCards: (state, action) => {
      state.currentCards = action.payload;
    },
    setFirstCard: (state, action) => {
      state.firstCard = action.payload;
    },
    setSecondCard: (state, action) => {
      state.secondCard = action.payload;
    },
    incTurnCount: state => {
      state.turnCount += 1;
    },
    resetTurnCount: state => {
      state.turnCount = 0;
    },
    setDisabled: (state, action) => {
      state.disabled = action.payload;
    }
  }
})

// generate and export actions
export const {
  setCardIndices,
  setCardFaces,
  setCardOrder,
  setCurrentCards,
  setFirstCard,
  setSecondCard,
  incTurnCount,
  resetTurnCount,
  setDisabled
} = memoryGameSlice.actions;
