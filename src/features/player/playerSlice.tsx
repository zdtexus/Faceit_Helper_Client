import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Player {
  nickname: string | null;
  description: string | null;
  playerFaceitId: string | null;
  steamId64: string | null;
  region: string | null;
  country: string | null;
  regionRank: number | null;
  countryRank: number | null;
  skillLevel: number | null;
  elo: number | null;
  avatarUrl: string | null;
  faceitUrl: string | null;
  steamUrl: string | null;
  activatedAt: string | null;
  memberships: string | null;
}

const initialState: Player = {
  nickname: null,
  description: null,
  playerFaceitId: null,
  steamId64: null,
  region: null,
  country: null,
  regionRank: null,
  countryRank: null,
  skillLevel: null,
  elo: null,
  avatarUrl: null,
  faceitUrl: null,
  steamUrl: null,
  activatedAt: null,
  memberships: null,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayer: (state, action: PayloadAction<Player>) => action.payload,
    clearPlayer: () => initialState,
  },
});

export const { setPlayer, clearPlayer } = playerSlice.actions;
export const playerReducer = playerSlice.reducer;
export const selectPlayer = (state: { player: Player }) => state.player;
