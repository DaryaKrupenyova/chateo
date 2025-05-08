import { configureStore } from "@reduxjs/toolkit";
import { accountsApi } from "../features/api/accountsApi";
import { chatsApi } from "../features/api/chatsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    [accountsApi.reducerPath]: accountsApi.reducer,
    [chatsApi.reducerPath]: chatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountsApi.middleware, chatsApi.middleware),
});

setupListeners(store.dispatch);

export default store;
