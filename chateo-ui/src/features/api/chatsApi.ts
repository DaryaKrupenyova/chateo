import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { Chat, ChatCardType } from "../../entities/chat/model/types";
import type { User } from "../../entities/user/model/types";

export const chatsApi = createApi({
  reducerPath: "chatsApi",
  keepUnusedDataFor: 10,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers) => {
      const key = localStorage.getItem("key");
      if (key) {
        headers.set("Authorization", `Token ${key}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: `/users/`,
        method: "GET",
      }),
    }),
    getUser: builder.query<User, { username: string }>({
      query: (args) => ({
        url: `/users/${args.username}`,
        method: "GET",
      }),
    }),
    editUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.username}/`,
        method: "PUT",
        body: { username: args.username, first_name: args.first_name, last_name: args.last_name },
      }),
    }),
    getChats: builder.query<ChatCardType[], void>({
      query: () => ({
        url: `/conversations/`,
        method: "GET",
      }),
    }),
    getChat: builder.query<Chat, { id: number }>({
      query: (args) => ({
        url: `/conversations/${args.id}/`,
        method: "GET",
      }),
    }),
    getUnreadMess: builder.query<number, { id: number }>({
      query: (args) => ({
        url: `/conversations/get_unread_messages/${args.id}`,
        method: "GET",
      }),
    }),
    startChat: builder.mutation({
      query: (args) => ({
        url: `/conversations/start/`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { username: args.username },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useEditUserMutation, useGetChatsQuery, useGetChatQuery, useGetUnreadMessQuery, useStartChatMutation } = chatsApi;
