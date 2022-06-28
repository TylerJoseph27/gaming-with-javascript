import { createSlice } from '@reduxjs/toolkit';

// create and export slice of TurnBasedGame component
export const turnBasedGameSlice = createSlice({
  name: 'turnBasedGame',
  initialState: {
    gameMode: '',
    announcement: '',
    battleSequence: '',
    playerStatus: {},
    enemyStatus: {}
  },
  reducers: {
    setGameMode: (state, action) => {
      state.gameMode = action.payload;
    },
    setAnnouncement: (state, action) => {
      state.announcement = action.payload;
    },
    setBattleSequence: (state, action) => {
      state.battleSequence = action.payload;
    },
    setPlayerStatus: (state, action) => {
      state.playerStatus = action.payload;
    },
    setPlayerName: (state, action) => {
      state.playerStatus.name = action.payload;
    },
    setPlayerAction: (state, action) => {
      state.playerStatus.action = action.payload;
    },
    setPlayerPlayState: (state, action) => {
      state.playerStatus.playState = action.payload;
    },
    incPlayerAccuracy: state => {
      if (state.playerStatus.lightAttack.accuracy < 100) {
        state.playerStatus.lightAttack.accuracy += 10;
        state.playerStatus.lightAttack.count += 1;
      }
      if (state.playerStatus.heavyAttack.accuracy < 100) {
        state.playerStatus.heavyAttack.accuracy += 10;
        state.playerStatus.heavyAttack.count += 1;
      }
      if (state.playerStatus.heal.accuracy < 100) {
        state.playerStatus.heal.accuracy += 10;
        state.playerStatus.heal.count += 1;
      }
    },
    decPlayerAccuracy: state => {
      if (state.playerStatus.lightAttack.accuracy > 0 && state.playerStatus.lightAttack.count > 0) {
        state.playerStatus.lightAttack.accuracy -= 10;
        state.playerStatus.lightAttack.count -= 1;
      }
      if (state.playerStatus.heavyAttack.accuracy > 0 && state.playerStatus.heavyAttack.count > 0) {
        state.playerStatus.heavyAttack.accuracy -= 10;
        state.playerStatus.heavyAttack.count -= 1;
      }
      if (state.playerStatus.heal.accuracy > 0 && state.playerStatus.heal.count > 0) {
        state.playerStatus.heal.accuracy -= 10;
        state.playerStatus.heal.count -= 1;
      }
    },
    resetPlayerAccuracy: state => {
      state.playerStatus.lightAttack.accuracy = 80;
      state.playerStatus.lightAttack.count = 0;
      state.playerStatus.heavyAttack.accuracy = 40;
      state.playerStatus.heavyAttack.count = 0;
      state.playerStatus.heal.accuracy = 60;
      state.playerStatus.heal.count = 0;
      state.playerStatus.magic.count = state.playerStatus.magic.amount;
    },
    setPlayerHealth: (state, action) => {
      state.playerStatus.health = action.payload;
    },
    setPlayerMagic: (state, action) => {
      state.playerStatus.magic.amount = action.payload;
      state.playerStatus.magic.count = action.payload;
      state.playerStatus.maxMagic = action.payload;
    },
    incPlayerMagic: state => {
      state.playerStatus.magic.amount += 1;
    },
    decPlayerMagic: state => {
      state.playerStatus.magic.amount -= 1;
    },
    setPlayerResist: (state, action) => {
      state.playerStatus.resistance = action.payload;
    },
    setPlayerEvade: (state, action) => {
      state.playerStatus.evasion = action.payload;
    },
    setPlayerCrit: (state, action) => {
      state.playerStatus.crit = action.payload;
    },
    setPlayerTaunt: (state, action) => {
      state.playerStatus.taunt = action.payload;
    },
    setEnemyStatus: (state, action) => {
      state.enemyStatus = action.payload;
    },
    setEnemyAction: (state, action) => {
      state.enemyStatus.action = action.payload;
    },
    setEnemyPlayState: (state, action) => {
      state.enemyStatus.playState = action.payload;
    },
    decEnemyAccuracy: state => {
      state.enemyStatus.lightAttack.accuracy = state.enemyStatus.lightAttack.accuracy - 10;
      state.enemyStatus.heavyAttack.accuracy = state.enemyStatus.heavyAttack.accuracy - 10;
      state.enemyStatus.heal.accuracy = state.enemyStatus.heal.accuracy - 10;
    },
    setEnemyHealth: (state, action) => {
      state.enemyStatus.health = action.payload;
    }
  }
})

// generate and export action creators
export const {
  setGameMode,
  setAnnouncement,
  setBattleSequence,
  setPlayerStatus,
  setPlayerName,
  setPlayerAction,
  setPlayerPlayState,
  incPlayerAccuracy,
  decPlayerAccuracy,
  resetPlayerAccuracy,
  setPlayerHealth,
  setPlayerMagic,
  incPlayerMagic,
  decPlayerMagic,
  setPlayerResist,
  setPlayerEvade,
  setPlayerCrit,
  setPlayerTaunt,
  setEnemyStatus,
  setEnemyAction,
  setEnemyPlayState,
  decEnemyAccuracy,
  setEnemyHealth
} = turnBasedGameSlice.actions;
