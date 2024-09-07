import { Middleware } from '@reduxjs/toolkit';
import { setPlayer, clearPlayer } from '../../features/player/playerSlice';
import { clearMatches } from '../../features/matches/matchesSlice';

export const clearMatchesOnPlayerChange: Middleware = (store) => (next) => (action) => {
  if (setPlayer.match(action) || clearPlayer.match(action)) {
    store.dispatch(clearMatches());
  }
  return next(action);
};