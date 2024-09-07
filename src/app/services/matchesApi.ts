import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MATCH_KEYS = [
  { key: "team", label: "Team" },
  { key: "kills", label: "Kills" },
  { key: "deaths", label: "Deaths" },
  { key: "assists", label: "Assists" },
  { key: "kdRatio", label: "K/D" },
  { key: "krRatio", label: "K/R" },
  { key: "hsPercent", label: "HS%" },
  { key: "elo", label: "ELO" },
  { key: "date", label: "Date" },
  { key: "triples", label: "Triple Kills" },
  { key: "quadros", label: "Quadro Kills" },
  { key: "pentas", label: "Penta Kills" },
  { key: "mvps", label: "MVPs" },
]

export interface MatchStats {
  kills: string;
  deaths: string;
  assists: string;
  kdRatio: string;
  krRatio: string;
  headshots: string;
  hsPercent: string;
  mvps: string;
  triples: string;
  quadros: string;
  pentas: string;
  mode: string;
  elo: string;
  adr: string;
  result: string;
  score: string;
  map: string;
  team: string;
  date: string;
  region: string;
  matchId: string;
  [key: string]: string;
}


export interface Match {
  stats: MatchStats;
}

export type MatchesResponse = Match[];

export const matchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:7777/api/player`
  }),
  endpoints: (builder) => ({
    getMatches: builder.query({
      query: ({ playerId, offset }) => `/${playerId}/matches?offset=${offset}`
    })
  })
});
export const { useGetMatchesQuery } = matchesApi;
