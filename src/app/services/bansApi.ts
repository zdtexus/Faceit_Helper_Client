import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const bansApi = createApi({
  reducerPath: "bansApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:7777/api/player`
  }),
  endpoints: (builder) => ({
    getBans: builder.query({
      query: (playerFaceitId) => `/${playerFaceitId}/bans`
    })
  })
});
export const { useGetBansQuery } = bansApi;