// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { playerReducer } from '../features/player/playerSlice';
import  matchesReducer from '../features/matches/matchesSlice';
import { mapsApi } from './services/mapsApi';
import { bansApi } from './services/bansApi';
import { matchesApi } from './services/matchesApi';
import { clearMatchesOnPlayerChange } from './middleware/clearMatchesOnPlayerChange';

export const store = configureStore({
  reducer: {
    player: playerReducer,
    matches: matchesReducer,
    [mapsApi.reducerPath]: mapsApi.reducer,
    [matchesApi.reducerPath]: matchesApi.reducer,
    [bansApi.reducerPath]: bansApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mapsApi.middleware)
      .concat(matchesApi.middleware)
      .concat(bansApi.middleware)
      .concat(clearMatchesOnPlayerChange),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
