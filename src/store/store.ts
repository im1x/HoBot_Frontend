import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "@services/AuthService";
import userReducer from "@store/reducers/UserSlice";
import webSocketSlice from "@store/reducers/WebSocketSlice";
import webSocketMiddleware from "@middleware/webSocketMiddleware";
import { settingsApi } from "@services/SettingsService";
import songRequestSlice from "@store/reducers/SongRequestSlice";
import { songRequestApi } from "@services/SongRequestService";
import { commonApi } from "@services/CommonService";
import { votingApi } from "@services/VotingService";
import votingSlice from "@store/reducers/VotingSlice";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
    wsMessages: webSocketSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [songRequestSlice.reducerPath]: songRequestSlice.reducer,
    [songRequestApi.reducerPath]: songRequestApi.reducer,
    [commonApi.reducerPath]: commonApi.reducer,
    [votingSlice.reducerPath]: votingSlice.reducer,
    [votingApi.reducerPath]: votingApi.reducer
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      settingsApi.middleware,
      songRequestApi.middleware,
      commonApi.middleware,
      votingApi.middleware,
      webSocketMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
