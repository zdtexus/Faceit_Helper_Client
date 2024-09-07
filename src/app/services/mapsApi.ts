import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MAPS_KEYS = [
  { key: "Matches", label: "Matches" },
  { key: "Win Rate %", label: "Win %" },
  { key: "Average Kills", label: "Kills" },
  { key: "Average Deaths", label: "Deaths" },
  { key: "Average Assists", label: "Assists" },
  { key: "Average K/D Ratio", label: "K/D" },
  { key: "Average K/R Ratio", label: "K/R" },
  { key: "Average Headshots %", label: "HS %" },
  { key: "ADR", label: "ADR" },
  { key: "Average Triple Kills", label: "Triple" },
  { key: "Average Quadro Kills", label: "Quadro" },
  { key: "Average Penta Kills", label: "Penta" },
  { key: "Average MVPs", label: "Avg MVPs" },
  { key: "Sniper Kill Rate per Round", label: "Sniper K/R" },
  { key: "Flash Success Rate", label: "Flash Rate" },
  { key: "Utility Usage per Round", label: "Utility/Round" },
  { key: "Utility Damage per Round", label: "Utility Damage/Round" },
  { key: "Entry Success Rate", label: "Entry Rate" },
  { key: "1v1 Win Rate", label: "1v1 Win" },
  { key: "1v2 Win Rate", label: "1v2 Win" },
]

export interface Map {
  mode: string;
  label: string;
  img: string;
  stats: Record<string, number>;
}

export interface MapsResponse {
  maps: Map[];
}

export const mapsApi = createApi({
  reducerPath: 'mapsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:7777/api/player`,
  }),
  endpoints: (builder) => ({
    getMaps: builder.query<MapsResponse, string>({
      query: (playerFaceitId) => `/${playerFaceitId}/maps`,
    }),
  }),
});

export const { useGetMapsQuery } = mapsApi;
