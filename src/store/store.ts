import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/AuthService.ts";
import userReducer from "./reducers/UserSlice";
import webSocketSlice from "./reducers/WebSocketSlice.ts";
import webSocketMiddleware from "../middleware/webSocketMiddleware.tsx";
import {settingsApi} from "../services/SettingsService.ts";
import songRequestSlice from "./reducers/SongRequestSlice.ts";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
    wsMessages: webSocketSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [songRequestSlice.reducerPath]: songRequestSlice.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, settingsApi.middleware, webSocketMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
