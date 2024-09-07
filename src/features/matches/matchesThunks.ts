import { createAsyncThunk } from "@reduxjs/toolkit";
import { Match } from "../../app/services/matchesApi";
import { RootState } from "../../app/store";
import { setMatches } from "./matchesSlice";

export const fetchMatches = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  'matches/fetchMatches',
  async (playerId, { rejectWithValue, getState, dispatch }) => {
    const state = getState() as RootState;
    const existingPlayerId = state.matches.playerFaceitId;

    if (existingPlayerId === playerId) {
      return;
    }

    const matchesPerPage = 100;
    let allMatches: Match[] = [];
    let offset = 0;
    let hasMore = true;

    try {
      while (hasMore) {
        const response = await fetch(`http://localhost:7777/api/player/${playerId}/matches?offset=${offset}`);
        if (!response.ok) {
          throw new Error('Failed to fetch matches');
        }
        const matches: Match[] = await response.json();
        allMatches = [...allMatches, ...matches];
        dispatch(setMatches({ playerFaceitId: playerId, matches: allMatches }));

        offset += 1;
        if (matches.length < matchesPerPage) {
          hasMore = false;
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
