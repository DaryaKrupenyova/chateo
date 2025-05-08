import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const accountsApi = createApi({
  reducerPath: "api",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (args) => ({
        url: `/auth/registration/`,
        method: "POST",
        body: { username: args.username, password1: args.password1, password2: args.password2 },
      }),
    }),
    loginUser: builder.mutation({
      query: (args) => ({
        url: `/auth/login/`,
        method: "POST",
        body: { username: args.username, password: args.password },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = accountsApi;
