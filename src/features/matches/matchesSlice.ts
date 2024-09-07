import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match } from '../../app/services/matchesApi';
import { fetchMatches } from './matchesThunks';

interface MatchesState {
  matches: Match[];
  playerFaceitId: string | null;
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MatchesState = {
  matches: [],
  playerFaceitId: null,
  loading: 'idle',
  error: null,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearMatches: (state) => {
      state.matches = [];
      state.playerFaceitId = null;
      state.loading = 'idle';
      state.error = null;
    },
    setMatches: (state, action: PayloadAction<{ playerFaceitId: string, matches: Match[] }>) => {
      const { playerFaceitId, matches } = action.payload;
      state.matches = matches;
      state.playerFaceitId = playerFaceitId;
      state.loading = 'succeeded';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { clearMatches, setMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
