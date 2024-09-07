import { createAsyncThunk } from '@reduxjs/toolkit';
import { setPlayer } from './playerSlice';
import { clearMatches } from '../matches/matchesSlice';
import { fetchMatches } from '../matches/matchesThunks';

interface SearchResponse {
  nickname: string;
  description: string;
  playerFaceitId: string;
  steamId64: string;
  region: string;
  country: string;
  regionRank: number;
  countryRank: number;
  skillLevel: number;
  elo: number;
  avatarUrl: string;
  faceitUrl: string;
  steamUrl: string;
  activatedAt: string;
  memberships: string;
}

export const fetchPlayer = createAsyncThunk(
  'player/fetchPlayer',
  async (searchValue: string, { dispatch }) => {
    dispatch(clearMatches());

    const response = await fetch(`http://localhost:7777/api/search/${encodeURIComponent(searchValue)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }

    const data: SearchResponse = await response.json();
    dispatch(setPlayer(data));

    dispatch(fetchMatches(data.playerFaceitId));
  }
);